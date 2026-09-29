import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from "react";

// Router mínimo basado en hash (ideal para un despliegue estático de un solo HTML).
// Usa la View Transitions API nativa cuando está disponible y no hay prefers-reduced-motion.

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

if (typeof window !== "undefined") {
  window.addEventListener("hashchange", notify);
}

const getPath = (): string => {
  const h = window.location.hash.replace(/^#/, "");
  return h === "" ? "/" : h;
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/** Hook: ruta actual */
export function usePath(): string {
  return useSyncExternalStore(subscribe, getPath, () => "/");
}

type VTDocument = Document & { startViewTransition?: (cb: () => void) => unknown };

/** Navega a otra ruta con transición nativa entre vistas */
export function navigate(to: string): void {
  if (getPath() === to) return;
  const go = () => {
    window.location.hash = to;
    notify();
    window.scrollTo(0, 0);
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as VTDocument;
  if (doc.startViewTransition && !reduce) doc.startViewTransition(go);
  else go();
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
}

/** Enlace interno accesible (aria-current en la ruta activa) */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const path = usePath();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={`#${to}`} onClick={handle} aria-current={path === to ? "page" : undefined} {...rest}>
      {children}
    </a>
  );
}
