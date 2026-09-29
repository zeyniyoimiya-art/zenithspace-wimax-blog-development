// Edge Function (Deno): recibe el formulario de contacto, valida con Zod,
// lo guarda en Postgres y (opcionalmente) lo reenvía por correo con Resend.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0), // honeypot
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, authorization, apikey",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400, headers: cors });
  }
  const { website: _honeypot, ...row } = parsed.data;
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { error } = await db.from("contact_messages").insert(row);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: cors });

  // Envío de correo (requiere RESEND_API_KEY y AUTHOR_EMAIL en los secretos de Supabase)
  const key = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("AUTHOR_EMAIL");
  if (key && to) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "ZenithSpace <onboarding@resend.dev>", to, subject: `[ZenithSpace] ${row.subject}`, text: `${row.name} <${row.email}>\n\n${row.message}` }),
    });
  }
  return new Response(JSON.stringify({ ok: true }), { headers: { ...cors, "Content-Type": "application/json" } });
});
