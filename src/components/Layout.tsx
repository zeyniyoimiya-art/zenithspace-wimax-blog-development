import { useEffect, useState, type ReactNode } from "react";
import { Link, usePath } from "../lib/router";
import { AmbientSound } from "./AmbientSound";
import { StarCursor } from "./StarCursor";
import { AUTHOR, AUTHOR_ROLE, SOCIALS } from "../data";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/blog/historia", label: "Historia" },
  { to: "/blog/personajes", label: "Personajes" },
  { to: "/blog/cobertura-mundial", label: "Cobertura" },
  { to: "/blog/wimax-bolivia", label: "WiMAX Bolivia" },
  { to: "/blog/empresas-bolivia", label: "Empresas" },
  { to: "/about", label: "Sobre el autor" },
  { to: "/contact", label: "Contacto" },
];

/** Logotipo ZenithSpace */
function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold" aria-label="ZenithSpace — ir al inicio">
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-nebula via-cosmic to-galaxy shadow-[0_0_24px_rgba(99,102,241,.6)]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 6h14L7 18h12" />
        </svg>
      </span>
      <span>
        Zenith<span className="text-cosmic">Space</span>
      </span>
    </Link>
  );
}

/** Cabecera sticky con glassmorphism */
function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const path = usePath();

  // Cierra el menú móvil al navegar
  useEffect(() => setOpen(false), [path]);

  // Alterna el tema claro/oscuro (oscuro por defecto)
  useEffect(() => {
    document.documentElement.dataset["theme"] = light ? "light" : "dark";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", light ? "#f4f2ff" : "#0a0a0f");
  }, [light]);

  return (
    <header className="glass-strong sticky top-0 z-50">
      <a
        href="#contenido"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("contenido")?.focus();
        }}
        className="absolute left-2 top-2 -translate-y-20 rounded-lg bg-white px-4 py-2 text-black focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-5 xl:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <AmbientSound />
          <button
            type="button"
            onClick={() => setLight((v) => !v)}
            aria-pressed={light}
            aria-label={light ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            className="glass grid h-10 w-10 place-items-center rounded-full text-lg transition hover:scale-110"
          >
            <span aria-hidden="true">{light ? "🌙" : "☀️"}</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label="Abrir menú de navegación"
            className="glass grid h-10 w-10 place-items-center rounded-full xl:hidden"
          >
            <span aria-hidden="true" className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-movil" aria-label="Menú móvil" className="border-t border-white/10 px-4 pb-4 pt-2 xl:hidden">
          <ul className="grid gap-1 sm:grid-cols-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="block rounded-xl px-3 py-3 hover:bg-white/10 aria-[current=page]:bg-white/10 aria-[current=page]:font-semibold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Pie de página con miniatura del autor */
function Footer() {
  return (
    <footer className="glass-strong mt-24 border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="flex items-start gap-4">
          <div
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-nebula via-cosmic to-galaxy font-display text-lg font-bold text-white shadow-[0_0_24px_rgba(6,182,212,.5)]"
          >
            CJ
          </div>
          <div>
            <p className="font-display text-lg font-semibold">{AUTHOR}</p>
            <p className="mt-1 text-sm text-muted">{AUTHOR_ROLE}</p>
            <Link to="/about" data-magnify className="mt-3 inline-block text-sm text-cosmic-link underline underline-offset-4" style={{ color: "var(--link)" }}>
              Conocer al autor →
            </Link>
          </div>
        </div>
        <nav aria-label="Secciones del blog">
          <p className="mb-3 font-display font-semibold">Explora</p>
          <ul className="grid gap-2 text-sm text-muted">
            {NAV.slice(1, 6).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-display font-semibold">Contacto y redes</p>
          <ul className="flex flex-wrap gap-3 text-sm">
            <li>
              <Link to="/contact" className="glass inline-block rounded-full px-4 py-2 hover:scale-105">
                ✉️ Escríbeme
              </Link>
            </li>
            {SOCIALS.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="glass inline-block rounded-full px-4 py-2 hover:scale-105">
                  {s.icon} {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">Imágenes: Pexels (crédito al autor en cada foto). Textura terrestre: three-globe.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-muted">
        <p>
          © {new Date().getFullYear()} ZenithSpace · Desarrollado por {AUTHOR} · Built with <span aria-label="cohete">🚀</span> by Zenith
        </p>
      </div>
    </footer>
  );
}

/** Estructura general: cursor, cabecera, contenido principal y pie */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <StarCursor />
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
