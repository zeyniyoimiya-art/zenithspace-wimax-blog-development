import { ArticleView } from "../components/ArticleView";
import { people, personajes, type Person } from "../data/personajes";

const tieStyle: Record<Person["tie"], string> = {
  Directo: "from-emerald-400 to-cyan-500",
  Indirecto: "from-amber-400 to-orange-500",
  "Sin vínculo verificado": "from-pink-500 to-fuchsia-600",
};

/** Cards de personajes con monograma (sin retratos sin licencia verificada) */
function PeopleGrid() {
  return (
    <section aria-labelledby="galeria-personas" className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
      <h2 id="galeria-personas" className="font-display text-2xl font-bold sm:text-3xl">
        👥 Galería de personajes
      </h2>
      <p className="mt-2 max-w-3xl text-muted">
        Cada ficha indica el nivel de vínculo <em>documentado</em> con WiMAX. Los monogramas sustituyen a los retratos para no usar fotos sin licencia verificada.
      </p>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((p) => (
          <li key={p.name} className="@container glow-card glass flex flex-col gap-3 p-6">
            <div className="flex items-center gap-4">
              <div aria-hidden="true" className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tieStyle[p.tie]} font-display text-xl font-bold text-white shadow-lg`}>
                {p.initials}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold leading-tight">{p.name}</h3>
                <p className="text-xs text-muted">{p.org}</p>
              </div>
            </div>
            <p className="text-sm font-medium">{p.role}</p>
            <p className="text-sm leading-relaxed text-muted">{p.bio}</p>
            <span className={`mt-auto w-fit rounded-full bg-gradient-to-r ${tieStyle[p.tie]} px-3 py-1 text-xs font-bold text-black`}>
              Vínculo: {p.tie}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Personajes() {
  return <ArticleView article={personajes} beforeBody={<PeopleGrid />} />;
}
