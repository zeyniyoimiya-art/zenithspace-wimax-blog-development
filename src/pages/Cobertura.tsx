import { useMemo, useState } from "react";
import { ArticleView } from "../components/ArticleView";
import { Globe, type GlobeMarker } from "../components/Globe";
import { cobertura, countries } from "../data/cobertura";

/** Mapa interactivo 3D: globo + panel de detalle + selector accesible por teclado */
function InteractiveMap() {
  const [sel, setSel] = useState<string>("us");
  const markers: GlobeMarker[] = useMemo(
    () => countries.map((c) => ({ id: c.id, lat: c.lat, lon: c.lon, color: c.verified ? "#22d3ee" : "#ec4899" })),
    [],
  );
  const current = countries.find((c) => c.id === sel) ?? countries[0];

  return (
    <section aria-labelledby="mapa" className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
      <h2 id="mapa" className="font-display text-2xl font-bold sm:text-3xl">
        🌍 Mapa interactivo de despliegues
      </h2>
      <p className="mt-2 max-w-3xl text-muted">
        Arrastra el globo o elige un país. Los puntos <span style={{ color: "#22d3ee" }}>cyan</span> tienen una cifra de usuarios con fuente pública; los <span style={{ color: "#f472b6" }}>magenta</span> son despliegues confirmados sin cifra verificable.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="glass relative aspect-square overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[560px]">
          <Globe
            markers={markers}
            selectedId={sel}
            onSelect={setSel}
            autoRotate={false}
            className="absolute inset-0"
            label="Globo 3D interactivo con los países donde se desplegó WiMAX. Usa la lista de países para elegir uno."
          />
        </div>

        <div className="flex flex-col gap-4">
          {current && (
            <div className="glow-card glass p-6" aria-live="polite">
              <p className="text-4xl" aria-hidden="true">{current.flag}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{current.name}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div><dt className="font-semibold text-muted">Operadores</dt><dd>{current.operators}</dd></div>
                <div><dt className="font-semibold text-muted">Período</dt><dd>{current.period}</dd></div>
                <div><dt className="font-semibold text-muted">Usuarios / cobertura pico</dt><dd className="font-display text-lg font-semibold text-cosmic">{current.peak}</dd></div>
                <div><dt className="font-semibold text-muted">Notas</dt><dd>{current.note}</dd></div>
              </dl>
            </div>
          )}
          <div role="group" aria-label="Seleccionar país" className="glass grid max-h-64 grid-cols-2 gap-2 overflow-y-auto rounded-2xl p-3 sm:grid-cols-3">
            {countries.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSel(c.id)}
                aria-pressed={sel === c.id}
                className={`rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/10 ${sel === c.id ? "bg-gradient-to-r from-nebula/40 to-cosmic/40 font-semibold" : ""}`}
              >
                <span aria-hidden="true">{c.flag}</span> {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass mt-6 overflow-hidden rounded-2xl">
        <div className="table-wrap">
          <table>
            <caption className="p-4 text-left font-display text-sm font-semibold text-muted">Estadísticas de usuarios pico por país (solo cifras con fuente)</caption>
            <thead>
              <tr>
                <th scope="col">País</th>
                <th scope="col">Operador</th>
                <th scope="col">Usuarios pico / cobertura</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c) => (
                <tr key={c.id}>
                  <td className="font-semibold">{c.flag} {c.name}</td>
                  <td>{c.operators}</td>
                  <td>{c.peak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Cobertura() {
  return <ArticleView article={cobertura} beforeBody={<InteractiveMap />} />;
}
