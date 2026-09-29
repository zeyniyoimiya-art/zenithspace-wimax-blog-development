import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";

// Esquema de validación con Zod (mismo esquema usable en el servidor / Edge Function)
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre (mínimo 2 caracteres)").max(80),
  email: z.string().trim().email("Introduce un correo válido"),
  subject: z.string().trim().min(3, "El asunto es muy corto").max(120),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
  website: z.string().max(0), // honeypot anti-spam: debe quedar vacío
});
type ContactInput = z.infer<typeof contactSchema>;
type Errors = Partial<Record<keyof ContactInput, string>>;

// Endpoint opcional (p. ej. una Supabase Edge Function que envía el correo)
const ENDPOINT = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.["VITE_CONTACT_ENDPOINT"];

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "demo" | "error">("idle");

  useEffect(() => {
    document.title = "Contacto — ZenithSpace";
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse({ ...raw, website: raw["website"] ?? "" });
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      setStatus("idle");
      (form.querySelector<HTMLElement>("[aria-invalid=true]"))?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
        if (!res.ok) throw new Error("HTTP " + res.status);
        setStatus("ok");
      } else {
        // Modo demostración: sin backend configurado se guarda localmente
        const box = JSON.parse(localStorage.getItem("zenith-outbox") ?? "[]") as unknown[];
        box.push({ ...parsed.data, at: new Date().toISOString() });
        localStorage.setItem("zenith-outbox", JSON.stringify(box));
        setStatus("demo");
      }
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const field = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-fg placeholder:text-muted/70 focus:border-cosmic focus:outline-none";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-mono text-sm" style={{ color: "var(--link)" }}>// CONTACTO</p>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
        Envía una <span className="text-cosmic">señal</span>
      </h1>
      <p className="mt-3 text-muted">¿Encontraste un error, tienes un dato de WiMAX en Bolivia o quieres colaborar? Escríbeme.</p>

      <form onSubmit={onSubmit} noValidate className="glass mt-8 space-y-5 rounded-3xl p-6 sm:p-8" aria-describedby="estado-form">
        {(
          [
            ["name", "Nombre", "text", "name"],
            ["email", "Correo electrónico", "email", "email"],
            ["subject", "Asunto", "text", "off"],
          ] as const
        ).map(([id, label, type, ac]) => (
          <div key={id}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
            <input id={id} name={id} type={type} autoComplete={ac} className={field} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} />
            {errors[id] && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-pink-400">{errors[id]}</p>}
          </div>
        ))}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">Mensaje</label>
          <textarea id="message" name="message" rows={6} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
          {errors.message && <p id="message-err" role="alert" className="mt-1 text-sm text-pink-400">{errors.message}</p>}
        </div>
        {/* Honeypot: los usuarios reales no lo ven */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label>Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <button type="submit" className="btn-cosmic" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar mensaje"} <span aria-hidden="true">🚀</span>
        </button>
        <div id="estado-form" role="status" aria-live="polite" className="text-sm">
          {status === "ok" && <p className="text-emerald-400">✅ ¡Mensaje enviado! Gracias por escribir.</p>}
          {status === "demo" && (
            <p className="text-amber-300">
              ✅ Mensaje validado y guardado localmente. Aún no hay un backend conectado (define VITE_CONTACT_ENDPOINT para enviarlo por correo mediante una Edge Function).
            </p>
          )}
          {status === "error" && <p className="text-pink-400">No se pudo enviar. Inténtalo de nuevo más tarde.</p>}
        </div>
      </form>
    </div>
  );
}
