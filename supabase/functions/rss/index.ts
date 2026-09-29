// Edge Function (Deno): genera el feed RSS a partir de la tabla `posts`.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data } = await db
    .from("posts")
    .select("slug,title,summary,published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const site = Deno.env.get("SITE_URL") ?? "https://zenithspace.vercel.app";
  const items = (data ?? [])
    .map(
      (p) =>
        `<item><title>${p.title}</title><link>${site}/#/blog/${p.slug}</link><description>${p.summary}</description><pubDate>${new Date(p.published_at).toUTCString()}</pubDate></item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>ZenithSpace</title><link>${site}</link><description>Blog sobre WiMAX</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
});
