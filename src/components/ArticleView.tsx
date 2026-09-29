import { useEffect, useState, type ReactNode } from "react";
import type { Article, Block, Img } from "../data/types";
import { AUTHOR, articlePath, articles, formatDate } from "../data";
import { px } from "../data/images";
import { Link } from "../lib/router";
import { useReveal } from "../lib/hooks";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Foto con atribución (dimensiones fijas → CLS = 0) */
function Photo({ img, w = 1200, h = 675, eager = false, className = "" }: { img: Img; w?: number; h?: number; eager?: boolean; className?: string }) {
  return (
    <img
      src={px(img.id, w, h)}
      alt={img.alt}
      width={w}
      height={h}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      className={`h-auto w-full object-cover ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    />
  );
}

/** Renderiza un bloque de contenido */
function BlockView({ b }: { b: Block }) {
  const ref = useReveal<HTMLDivElement>();
  let content: ReactNode = null;

  switch (b.k) {
    case "h2":
      content = (
        <h2 id={slugify(b.t)} className="scroll-mt-28 pt-10 font-display text-2xl font-bold sm:text-3xl">
          <span className="text-cosmic">#</span> {b.t}
        </h2>
      );
      break;
    case "h3":
      content = <h3 className="pt-4 font-display text-xl font-semibold">{b.t}</h3>;
      break;
    case "p":
      content = <p>{b.t}</p>;
      break;
    case "list":
      content = (
        <ul className="mb-5 list-disc space-y-2 pl-6 text-[color-mix(in_srgb,var(--fg)_88%,transparent)]">
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
      break;
    case "quote":
      content = (
        <figure className="glass my-8 rounded-2xl border-l-4 border-l-cosmic p-6">
          <blockquote className="font-display text-lg italic leading-relaxed">«{b.t}»</blockquote>
          <figcaption className="mt-3 text-sm text-muted">— {b.by}</figcaption>
        </figure>
      );
      break;
    case "table":
      content = (
        <div className="glass my-8 overflow-hidden rounded-2xl">
          <div className="table-wrap">
            <table>
              <caption className="p-4 text-left font-display text-sm font-semibold text-muted">{b.caption}</caption>
              <thead>
                <tr>
                  {b.head.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j} className={j === 0 ? "font-semibold" : ""}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      break;
    case "img":
      content = (
        <figure className="my-8 overflow-hidden rounded-2xl">
          <Photo img={b.img} />
          <figcaption className="glass px-4 py-3 text-sm text-muted">
            {b.caption} <span className="opacity-80">· Foto: {b.img.credit} / Pexels</span>
          </figcaption>
        </figure>
      );
      break;
    case "gallery":
      content = (
        <div className="my-8 grid gap-3 sm:grid-cols-3" role="group" aria-label="Galería de imágenes">
          {b.imgs.map((g) => (
            <figure key={g.id} className="glow-card glass overflow-hidden">
              <Photo img={g} w={600} h={450} />
              <figcaption className="px-3 py-2 text-xs text-muted">Foto: {g.credit} / Pexels</figcaption>
            </figure>
          ))}
        </div>
      );
      break;
    case "fact":
      content = (
        <aside className="my-8 rounded-2xl bg-gradient-to-r from-nebula/25 via-cosmic/20 to-galaxy/25 p-[1.5px]" aria-label="Sabías que">
          <div className="glass-strong rounded-[calc(1rem-1px)] p-6">
            <p className="mb-2 font-display text-sm font-bold uppercase tracking-widest" style={{ color: "var(--link)" }}>
              ✨ Sabías que…
            </p>
            <p className="!mb-0 leading-relaxed">{b.t}</p>
          </div>
        </aside>
      );
      break;
  }
  return (
    <div ref={ref} className="reveal">
      {content}
    </div>
  );
}

/** Barra de progreso de lectura */
function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full" role="progressbar" aria-label="Progreso de lectura" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(p * 100)}>
      <div className="h-full origin-left bg-gradient-to-r from-nebula via-cosmic to-galaxy" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

/** Vista completa de un artículo: hero, índice, contenido, fuentes, firma y navegación */
export function ArticleView({ article, beforeBody }: { article: Article; beforeBody?: ReactNode }) {
  const toc = article.blocks.filter((b): b is Extract<Block, { k: "h2" }> => b.k === "h2");
  const idx = articles.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? articles[idx - 1] : undefined;
  const next = idx >= 0 ? articles[idx + 1] : undefined;

  useEffect(() => {
    document.title = `${article.title} — ZenithSpace`;
  }, [article.title]);

  return (
    <>
      <ReadingProgress />
      <div className="relative">
        <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
          <Photo img={article.hero} w={1600} h={800} eager className="!h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/20" />
        </div>
        <div className="mx-auto -mt-40 max-w-4xl px-4 sm:px-6">
          <p className="mb-3 inline-block rounded-full bg-gradient-to-r from-nebula to-galaxy px-4 py-1 text-sm font-semibold text-white">{article.kicker}</p>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{article.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{article.summary}</p>
          <p className="mt-5 text-sm text-muted">
            <strong className="text-fg">Por: {AUTHOR}</strong> · {formatDate(article.date)} · {article.readMin} min de lectura
          </p>
          <p className="mt-1 text-xs text-muted">Foto de portada: {article.hero.credit} / Pexels</p>
        </div>
      </div>

      {beforeBody}

      <div className="mx-auto mt-12 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="Índice del artículo" className="glass sticky top-24 rounded-2xl p-5">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-muted">En este artículo</p>
            <ul className="space-y-2 text-sm">
              {toc.map((h) => (
                <li key={h.t}>
                  <a href={`#${slugify(h.t)}`} onClick={(e) => { e.preventDefault(); document.getElementById(slugify(h.t))?.scrollIntoView({ behavior: "smooth" }); }} className="block leading-snug text-muted transition hover:text-fg">
                    {h.t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="prose-zenith min-w-0 max-w-3xl">
          {article.blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}

          <section aria-labelledby="fuentes" className="glass mt-14 rounded-2xl p-6">
            <h2 id="fuentes" className="mb-4 font-display text-xl font-bold">
              📚 Fuentes y referencias
            </h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <footer className="glass mt-8 flex items-center gap-4 rounded-2xl p-5">
            <div aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-nebula via-cosmic to-galaxy font-display font-bold text-white">
              CJ
            </div>
            <p className="!mb-0 text-sm">
              <strong className="font-display text-base">Por: {AUTHOR}</strong>
              <br />
              <span className="text-muted">Estudiante de Sistemas Informáticos, INCOS El Alto</span>
            </p>
          </footer>

          <nav aria-label="Artículos anteriores y siguientes" className="mt-10 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link to={articlePath(prev)} data-magnify className="glow-card glass block p-5">
                <span className="text-xs text-muted">← Anterior</span>
                <span className="mt-1 block font-display font-semibold">{prev.kicker}: {prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={articlePath(next)} data-magnify className="glow-card glass block p-5 text-right">
                <span className="text-xs text-muted">Siguiente →</span>
                <span className="mt-1 block font-display font-semibold">{next.kicker}: {next.title}</span>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </>
  );
}
