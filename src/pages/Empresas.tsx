import { ArticleView } from "../components/ArticleView";
import { empresas, empresasArt, type Evidencia } from "../data/empresas";

const evStyle: Record<Evidencia, string> = {
  Confirmado: "bg-emerald-400 text-black",
  Parcial: "bg-amber-300 text-black",
  "No verificado": "bg-pink-400 text-black",
};

/** Tarjetas de empresas (container queries: el diseño depende del ancho de la tarjeta, no del viewport) */
function CompanyCards() {
  return (
    <section aria-labelledby="empresas" className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
      <h2 id="empresas" className="font-display text-2xl font-bold sm:text-3xl">
        📡 Operadores y WiMAX
      </h2>
      <p className="mt-2 max-w-3xl text-muted">
        La etiqueta de evidencia indica cuánto respaldo público tiene el vínculo de cada empresa con WiMAX. Los monogramas reemplazan a los logotipos registrados.
      </p>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {empresas.map((e) => (
          <li key={e.id} className="@container">
            <article className="glow-card glass h-full p-6 @xl:p-8">
              <div className="flex flex-col gap-4 @xl:flex-row @xl:items-center">
                <div aria-hidden="true" className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${e.color} font-display text-2xl font-bold text-white`}>
                  {e.mono}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold">{e.nombre}</h3>
                  <p className="text-sm text-muted">{e.tipo} · {e.fundada}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold @xl:ml-auto ${evStyle[e.evidencia]}`}>{e.evidencia}</span>
              </div>
              <dl className="mt-5 grid gap-3 text-sm @xl:grid-cols-2">
                <div><dt className="font-semibold text-muted">WiMAX</dt><dd>{e.wimax}</dd></div>
                <div><dt className="font-semibold text-muted">Cobertura</dt><dd>{e.cobertura}</dd></div>
                <div><dt className="font-semibold text-muted">Velocidades</dt><dd>{e.velocidades}</dd></div>
                <div><dt className="font-semibold text-muted">Estado actual</dt><dd>{e.estado}</dd></div>
              </dl>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Empresas() {
  return <ArticleView article={empresasArt} beforeBody={<CompanyCards />} />;
}
