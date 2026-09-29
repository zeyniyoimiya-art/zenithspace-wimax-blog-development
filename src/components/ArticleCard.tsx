import type { Article } from "../data/types";
import { articlePath, formatDate } from "../data";
import { px } from "../data/images";
import { Link } from "../lib/router";

/** Tarjeta glassmorphism con borde luminoso en hover. Usa container queries (@container). */
export function ArticleCard({ a }: { a: Article }) {
  return (
    <article className="@container glow-card glass overflow-hidden">
      <Link to={articlePath(a)} data-magnify className="group flex h-full flex-col" aria-label={`Leer: ${a.title}`}>
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={px(a.hero.id, 640, 360)}
            alt={a.hero.alt}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 @md:p-7">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-gradient-to-r from-nebula to-cosmic px-3 py-1 font-semibold text-white">{a.kicker}</span>
            <span className="text-muted">
              {formatDate(a.date)} · {a.readMin} min
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug @md:text-2xl">{a.title}</h3>
          <p className="text-sm leading-relaxed text-muted">{a.summary}</p>
          <span className="mt-auto pt-2 font-medium" style={{ color: "var(--link)" }}>
            Leer artículo →
          </span>
        </div>
      </Link>
    </article>
  );
}
