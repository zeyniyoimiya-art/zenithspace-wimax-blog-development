import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Ambiente sonoro espacial con Web Audio API.
 * - Pad sintetizado (acorde de La menor con osciladores desafinados) a volumen muy bajo.
 * - Filtro BiquadFilter (lowpass) cuya frecuencia reacciona al progreso de scroll.
 * - Desactivado por defecto (las políticas de autoplay exigen un gesto del usuario).
 * - prefers-reduced-motion: sin LFO ni reacción al scroll (tono estático).
 */
export function AmbientSound() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode[]>([]);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // El scroll modula la frecuencia de corte del filtro
  useEffect(() => {
    if (!on) return;
    const onScroll = () => {
      const f = filterRef.current;
      const ctx = ctxRef.current;
      if (!f || !ctx || reduce.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      f.frequency.setTargetAtTime(300 + p * 1700, ctx.currentTime, 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [on]);

  const start = useCallback(async () => {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500;
    filter.Q.value = 4;
    filter.connect(master).connect(ctx.destination);

    const freqs = [110, 164.81, 220, 261.63, 329.63]; // A2, E3, A3, C4, E4
    const oscs = freqs.flatMap((f, i) =>
      [-6, 6].map((detune) => {
        const o = ctx.createOscillator();
        o.type = i % 2 === 0 ? "sawtooth" : "triangle";
        o.frequency.value = f;
        o.detune.value = detune;
        const g = ctx.createGain();
        g.gain.value = 0.12 / freqs.length;
        o.connect(g).connect(filter);
        o.start();
        return o;
      }),
    );

    // LFO lento que "respira" en el filtro (solo sin reduced-motion)
    if (!reduce.current) {
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.07;
      lfoGain.gain.value = 180;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start();
      oscs.push(lfo);
    }

    master.gain.setTargetAtTime(0.35, ctx.currentTime, 1.2); // fundido de entrada suave
    filterRef.current = filter;
    masterRef.current = master;
    oscRef.current = oscs;
    setOn(true);
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      const oscs = oscRef.current;
      window.setTimeout(() => {
        oscs.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* ya detenido */
          }
        });
      }, 1200);
    }
    oscRef.current = [];
    setOn(false);
  }, []);

  useEffect(
    () => () => {
      oscRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* noop */
        }
      });
      void ctxRef.current?.close();
    },
    [],
  );

  return (
    <button
      type="button"
      onClick={() => (on ? stop() : void start())}
      aria-pressed={on}
      aria-label={on ? "Silenciar el ambiente sonoro" : "Activar el ambiente sonoro"}
      title={on ? "Silenciar sonido ambiente" : "Activar sonido ambiente"}
      className="glass grid h-10 w-10 place-items-center rounded-full text-lg transition hover:scale-110"
    >
      <span aria-hidden="true">{on ? "🔊" : "🔇"}</span>
    </button>
  );
}
