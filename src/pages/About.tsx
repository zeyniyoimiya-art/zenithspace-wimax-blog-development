import { useEffect } from "react";
import { AUTHOR, AUTHOR_ROLE, SOCIALS } from "../data";
import { Link } from "../lib/router";

const SKILLS = [
  { name: "Investigación técnica", level: 90, note: "Contraste de fuentes: IEEE, NIST, ITU, prensa especializada" },
  { name: "Redes y telecomunicaciones", level: 78, note: "WiMAX, LTE, espectro y arquitectura de redes inalámbricas" },
  { name: "Desarrollo web (TypeScript / React)", level: 80, note: "Este blog: React, Vite y Tailwind CSS" },
  { name: "Gráficos 3D en la web", level: 70, note: "Three.js, shaders GLSL y Pointer Events" },
  { name: "Accesibilidad y rendimiento", level: 75, note: "ARIA, foco visible, prefers-reduced-motion, CLS = 0" },
];

export function About() {
  useEffect(() => {
    document.title = `Sobre el autor — ${AUTHOR} · ZenithSpace`;
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="font-mono text-sm" style={{ color: "var(--link)" }}>// SOBRE EL AUTOR</p>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">
        <span className="text-cosmic">{AUTHOR}</span>
      </h1>
      <p className="mt-3 font-display text-xl text-muted">{AUTHOR_ROLE}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[220px_1fr]">
        <div className="glow-card glass grid aspect-square w-full max-w-[220px] place-items-center p-2">
          <div aria-hidden="true" className="grid h-full w-full place-items-center rounded-2xl bg-gradient-to-br from-nebula via-cosmic to-galaxy font-display text-6xl font-bold text-white">
            CJ
          </div>
        </div>
        <div className="prose-zenith">
          <p>
            Soy <strong>{AUTHOR}</strong>, estudiante de Sistemas Informáticos en el Instituto Nacional de Comercio (INCOS) de El Alto, Bolivia. Creé <strong>ZenithSpace</strong> para investigar y explicar una tecnología que marcó la historia de las telecomunicaciones: WiMAX.
          </p>
          <p>
            Me interesa especialmente el caso boliviano: un país de altiplano, valles y llanos donde la conectividad inalámbrica ha sido, y sigue siendo, una necesidad real. Mi objetivo con este blog es reunir en un solo lugar información verificada —citando siempre sus fuentes— y presentarla con una experiencia visual a la altura del tema.
          </p>
          <p>
            Trabajo con honestidad intelectual: cuando un dato no pudo verificarse, el blog lo dice de forma explícita en lugar de inventarlo.
          </p>
        </div>
      </div>

      <section className="mt-14" aria-labelledby="skills">
        <h2 id="skills" className="font-display text-2xl font-bold">Habilidades</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <li key={s.name} className="glass rounded-2xl p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display font-semibold">{s.name}</p>
                <span className="font-mono text-sm text-muted">{s.level}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label={s.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={s.level}>
                <div className="h-full rounded-full bg-gradient-to-r from-nebula via-cosmic to-galaxy" style={{ width: `${s.level}%` }} />
              </div>
              <p className="mt-2 text-sm text-muted">{s.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass mt-14 rounded-3xl p-8 text-center" aria-labelledby="contacto-about">
        <h2 id="contacto-about" className="font-display text-2xl font-bold">¿Hablamos?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted">Sugerencias, correcciones de datos o ideas para nuevos artículos son bienvenidas.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-cosmic">Enviar un mensaje</Link>
          {SOCIALS.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="glass rounded-full px-6 py-3">
              {s.icon} {s.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
