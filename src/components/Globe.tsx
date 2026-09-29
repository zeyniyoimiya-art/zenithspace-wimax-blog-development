import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Globo terráqueo 3D (Three.js / WebGL).
 * - Textura nocturna de la Tierra (three-globe, vía unpkg) con degradado si falla la carga.
 * - Shader GLSL personalizado para la atmósfera (efecto Fresnel).
 * - Anillos animados que simulan ondas de señal WiMAX expandiéndose desde cada marcador.
 * - Arrastre con Pointer Events (ratón y táctil), clic para seleccionar y foco animado.
 * - prefers-reduced-motion: sin rotación automática ni ondas animadas (fallback estático).
 *
 * Nota: usa WebGL (Three.js). WebGPU/TypeGPU no se usa porque el proyecto se sirve como un único HTML estático.
 */

export interface GlobeMarker {
  id: string;
  lat: number;
  lon: number;
  color?: string;
}

interface GlobeProps {
  markers: GlobeMarker[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  autoRotate?: boolean;
  className?: string;
  label: string;
}

const TEXTURE_URL = "https://unpkg.com/three-globe/example/img/earth-night.jpg";

/** Convierte latitud/longitud a un punto sobre la esfera (radio r) */
function latLonToVec3(lat: number, lon: number, r = 1): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

interface Api {
  focus: (id: string) => void;
}

export function Globe({ markers, selectedId = null, onSelect, autoRotate = true, className = "", label }: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<Api | null>(null);
  const selectedRef = useRef<string | null>(selectedId);
  const onSelectRef = useRef(onSelect);
  const [failed, setFailed] = useState(false);

  selectedRef.current = selectedId;
  onSelectRef.current = onSelect;

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Renderizador (si WebGL no está disponible, se muestra un fallback CSS) ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.touchAction = "pan-y"; // permite scroll vertical en móviles
    el.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 3.5;

    const globe = new THREE.Group();
    scene.add(globe);

    // --- Tierra ---
    const earthMat = new THREE.MeshBasicMaterial({ color: 0x0c1440 });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat);
    globe.add(earth);

    let texture: THREE.Texture | null = null;
    new THREE.TextureLoader().setCrossOrigin("anonymous").load(
      TEXTURE_URL,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        texture = tex;
        earthMat.map = tex;
        earthMat.color.set(0xb8c4ff);
        earthMat.needsUpdate = true;
      },
      undefined,
      () => {
        /* Sin red: se conserva la esfera oscura con la malla de latitud/longitud */
      },
    );

    // Malla de latitud/longitud (estética "radar")
    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(1.004, 36, 18),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.09 }),
    );
    globe.add(grid);

    // --- Atmósfera con shader GLSL personalizado (Fresnel) ---
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.16, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            vec3 col = mix(vec3(0.39, 0.40, 0.95), vec3(0.02, 0.71, 0.83), intensity);
            gl_FragColor = vec4(col, 1.0) * intensity * 1.6;
          }`,
      }),
    );
    scene.add(atmosphere);

    // --- Marcadores y ondas de señal ---
    const dirs = new Map<string, THREE.Vector3>();
    const dots: { id: string; mesh: THREE.Mesh }[] = [];
    const hits: THREE.Mesh[] = [];
    const rings: { mesh: THREE.Mesh; offset: number }[] = [];

    for (const m of markers) {
      const pos = latLonToVec3(m.lat, m.lon, 1.006);
      dirs.set(m.id, pos.clone().normalize());
      const color = new THREE.Color(m.color ?? "#ec4899");

      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 16), new THREE.MeshBasicMaterial({ color }));
      dot.position.copy(pos);
      globe.add(dot);
      dots.push({ id: m.id, mesh: dot });

      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 8, 8),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      );
      hit.position.copy(pos);
      hit.userData["id"] = m.id;
      globe.add(hit);
      hits.push(hit);

      for (let i = 0; i < 2; i++) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.88, 1, 40),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false }),
        );
        ring.position.copy(pos);
        ring.lookAt(pos.clone().multiplyScalar(2)); // orientado hacia afuera de la superficie
        globe.add(ring);
        rings.push({ mesh: ring, offset: i * 0.5 + (m.lat % 7) / 20 });
      }
    }

    // Orientación inicial: mirando hacia América
    globe.quaternion.setFromEuler(new THREE.Euler(0.25, 1.1, 0));

    // --- Tamaño responsivo ---
    const resize = () => {
      const w = el.clientWidth || 300;
      const h = el.clientHeight || 300;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = camera.aspect < 1 ? 3.5 / Math.max(camera.aspect, 0.55) : 3.5;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // --- Interacción con Pointer Events ---
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const yAxis = new THREE.Vector3(0, 1, 0);
    const xAxis = new THREE.Vector3(1, 0, 0);
    const qTmp = new THREE.Quaternion();
    const focusQ = new THREE.Quaternion();
    let focusing = false;
    let dragging = false;
    let hovering = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;

    const pick = (clientX: number, clientY: number): string | null => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const first = raycaster.intersectObjects([earth, ...hits], false)[0];
      const id = first?.object.userData["id"];
      return typeof id === "string" ? id : null;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        moved += Math.abs(dx) + Math.abs(dy);
        globe.quaternion.premultiply(qTmp.setFromAxisAngle(yAxis, dx * 0.006));
        globe.quaternion.premultiply(qTmp.setFromAxisAngle(xAxis, dy * 0.006));
        focusing = false;
      } else {
        hovering = pick(e.clientX, e.clientY) !== null;
        canvas.style.cursor = hovering ? "pointer" : "grab";
      }
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      if (moved < 6) {
        const id = pick(e.clientX, e.clientY);
        if (id) onSelectRef.current?.(id);
      }
    };
    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    // Foco animado hacia un marcador
    apiRef.current = {
      focus: (id: string) => {
        const v = dirs.get(id);
        if (!v) return;
        focusQ.setFromUnitVectors(v, new THREE.Vector3(0, 0.2, 1).normalize());
        if (reduce) globe.quaternion.copy(focusQ);
        else focusing = true;
      },
    };
    if (selectedRef.current) apiRef.current.focus(selectedRef.current);

    // --- Pausar cuando no es visible (rendimiento / INP) ---
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    io.observe(el);

    // --- Bucle de animación ---
    let raf = 0;
    let last = performance.now();
    let t = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;

      if (!reduce) {
        if (focusing) {
          globe.quaternion.slerp(focusQ, 1 - Math.pow(0.002, dt));
          if (globe.quaternion.angleTo(focusQ) < 0.003) focusing = false;
        } else if (autoRotate && !dragging && !hovering) {
          globe.quaternion.premultiply(qTmp.setFromAxisAngle(yAxis, dt * 0.12));
        }
      }

      // Ondas de señal WiMAX: anillos que se expanden y se desvanecen
      for (const r of rings) {
        const phase = reduce ? 0.45 : (t * 0.32 + r.offset) % 1;
        const s = 0.015 + phase * 0.11;
        r.mesh.scale.set(s, s, s);
        (r.mesh.material as THREE.MeshBasicMaterial).opacity = reduce ? 0.35 : (1 - phase) * 0.75;
      }

      // Resalta el marcador seleccionado
      for (const d of dots) {
        const target = d.id === selectedRef.current ? 2.2 : 1;
        const s = d.mesh.scale.x + (target - d.mesh.scale.x) * 0.15;
        d.mesh.scale.set(s, s, s);
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    // --- Limpieza de recursos GPU ---
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      apiRef.current = null;
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material as THREE.Material | THREE.Material[];
          (Array.isArray(mat) ? mat : [mat]).forEach((m) => m.dispose());
        }
      });
      texture?.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [markers, autoRotate]);

  // Al cambiar la selección desde fuera (lista de países), gira el globo hacia ese punto
  useEffect(() => {
    if (selectedId) apiRef.current?.focus(selectedId);
  }, [selectedId]);

  return (
    <div className={`relative ${className}`} role="img" aria-label={label}>
      <div ref={mountRef} className="absolute inset-0" />
      {failed && (
        <div
          className="absolute inset-[12%] rounded-full"
          style={{ background: "radial-gradient(circle at 35% 30%, #6366f1, #0c1440 60%, #06b6d4 130%)", boxShadow: "0 0 80px rgba(99,102,241,.5)" }}
        />
      )}
    </div>
  );
}
