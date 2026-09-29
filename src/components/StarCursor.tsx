import { useEffect, useRef } from "react";

/**
 * Cursor personalizado con rastro de estrellas cósmicas.
 * - Pointer Events (ratón, lápiz y táctil).
 * - Efecto "magnify" sobre enlaces y "morph" sobre botones.
 * - Se desactiva con prefers-reduced-motion. El cursor nativo NUNCA se oculta (accesibilidad).
 */

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

export function StarCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ring = ringRef.current;
    if (!canvas || !ring) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = [];
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let lastSpawn = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      ring.style.opacity = e.pointerType === "touch" ? "0" : "1";
      const now = performance.now();
      if (now - lastSpawn > 28) {
        lastSpawn = now;
        stars.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 0.9,
          vy: Math.random() * 0.7 + 0.1,
          life: 1,
          size: Math.random() * 2.2 + 1,
          hue: [239, 187, 330][Math.floor(Math.random() * 3)] ?? 187,
        });
        if (stars.length > 60) stars.shift();
      }
      const t = e.target as Element | null;
      ring.classList.toggle("is-button", !!t?.closest("button, [role=button], .btn-cosmic"));
      ring.classList.toggle("is-link", !!t?.closest("a:not(.btn-cosmic), [data-magnify]"));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const drawStar = (s: Star) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = Math.max(s.life, 0);
      ctx.fillStyle = `hsl(${s.hue} 90% 70%)`;
      ctx.shadowColor = `hsl(${s.hue} 90% 60%)`;
      ctx.shadowBlur = 10;
      ctx.rotate(s.life * 3);
      ctx.beginPath();
      // Estrella de 4 puntas
      const r = s.size * 2.4;
      for (let i = 0; i < 8; i++) {
        const rad = i % 2 === 0 ? r : r * 0.35;
        const a = (Math.PI / 4) * i;
        ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, w, h);
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        if (!s) continue;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.02;
        if (s.life <= 0) stars.splice(i, 1);
        else drawStar(s);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9998]" />
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
