import { useEffect, useMemo } from "react";
import { Globe, type GlobeMarker } from "../components/Globe";
import { ArticleCard } from "../components/ArticleCard";
import { countries } from "../data/cobertura";
import { articles, latest } from "../data";
import { Link } from "../lib/router";
import { useCountUp, useReveal } from "../lib/hooks";

/** Título con animación por letras (equivalente a SplitText). Accesible: aria-label + chars aria-hidden */
function SplitTitle({ text }: { text: string }) {
  return (
    <h1 aria-label={text} className="font-display text-6xl font-bold leading-none tracking-tight sm:text-7xl lg:text-8xl">
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`split-char ${i >= 6 ? "text-cosmic" : ""}`}
          style={{ animationDelay: `${i * 70 + 150}ms` }}
        >
          {ch}
        </span>
      ))}
    </h1>
  );
}

function Stat({ to, suffix = "", label, detail }: { to: number; suffix?: string; label: string; detail: string }) {
  const { ref, val } = useCountUp(to);
  return (
    <div className="glow-card glass p-6 text-center">
      <p className="font-display text-5xl font-bold text-cosmic">
        <span ref={ref}>{val.toLocaleString("es-BO")}</span>
        {suffix}
      </p>
      <p className="mt-2 font-display text-lg font-semibold">{label}</p>
      <p className="mt-1 text-sm text-muted">{detail}</p>
    </div>
  );
}

export function Home() {
  const markers: GlobeMarker[] = useMemo(
    () => countries.map((c) => ({ id: c.id, lat: c.lat, lon: c.lon, color: c.id === "bo" ? "#f8fafc" : "#ec4899" })),
    [],
  );
  const revealA = useReveal<HTMLDivElement>();
  const revealB = useReveal<HTMLDivElement>();

  useEffect(() => {
    document.title = "ZenithSpace — Blog sobre WiMAX (IEEE 802.16) y su historia en Bolivia";
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 font-mono text-xs sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cosmic" aria-hidden="true" />
            IEEE 802.16 · WORLDWIDE INTEROPERABILITY FOR MICROWAVE ACCESS
          </p>
          <SplitTitle text="ZenithSpace" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Un blog sobre <strong className="text-fg">WiMAX</strong>: la tecnología que quiso llevar Internet inalámbrico a todo el planeta. Su historia, sus protagonistas, su mapa mundial y su paso por Bolivia.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="btn-cosmic"
              onClick={() => document.getElementById("ultimas")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explorar la red <span aria-hidden="true">→</span>
            </button>
            <Link to="/about" className="glass rounded-full px-6 py-3 font-medium transition hover:scale-105">
              Conocer al autor
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted">Por: Calle Cucho Josue Salomon</p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-nebula/30 via-cosmic/10 to-galaxy/30 blur-3xl" aria-hidden="true" />
          <Globe
            markers={markers}
            className="h-full w-full"
            label="Globo terráqueo 3D con puntos brillantes en los países donde WiMAX tuvo cobertura y ondas de señal expandiéndose"
          />
          <p className="pointer-events-none absolute bottom-0 left-0 right-0 text-center font-mono text-xs text-muted">
            Arrastra para girar el globo
          </p>
        </div>
      </section>

      {/* ÚLTIMAS PUBLICACIONES */}
      <section id="ultimas" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6" aria-labelledby="t-ultimas">
        <div ref={revealA} className="reveal">
          <p className="font-mono text-sm" style={{ color: "var(--link)" }}>// PUBLICACIONES</p>
          <h2 id="t-ultimas" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Últimas 3 publicaciones
          </h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest(3).map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
        <nav aria-label="Todas las secciones" className="mt-8 flex flex-wrap gap-3">
          {articles.map((a) => (
            <Link key={a.slug} to={`/blog/${a.slug}`} className="glass rounded-full px-4 py-2 text-sm transition hover:scale-105">
              {a.kicker}
            </Link>
          ))}
        </nav>
      </section>

      {/* WIMAX EN NÚMEROS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="t-numeros">
        <div ref={revealB} className="reveal">
          <p className="font-mono text-sm" style={{ color: "var(--link)" }}>// DATOS</p>
          <h2 id="t-numeros" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            WiMAX en números
          </h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Stat to={519} label="Redes desplegadas" detail="WiMAX Forum, diciembre de 2009" />
          <Stat to={146} label="Países" detail="Con al menos un despliegue (2009)" />
          <Stat to={25} suffix=" M" label="Abonados" detail="Estimación de Maravedis, fines de 2011" />
          <Stat to={9} label="Capitales bolivianas" detail="Anuncio de Entel WiMAX, octubre de 2008" />
        </div>
        <p className="mt-5 text-sm text-muted">
          Frecuencia clave en Bolivia: <span className="font-mono">3,5 GHz</span> — la misma banda que hoy se asigna al 5G.
        </p>
      </section>
    </>
  );
}
