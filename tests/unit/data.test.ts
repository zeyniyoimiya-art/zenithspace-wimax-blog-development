// Pruebas unitarias (Vitest). Ejecutar con: npx vitest
// Requiere: npm i -D vitest
import { describe, expect, it } from "vitest";
import { articles, latest, AUTHOR } from "../../src/data";
import { countries } from "../../src/data/cobertura";
import { contactSchema } from "../../src/pages/Contact";

describe("contenido del blog", () => {
  it("tiene los cinco artículos requeridos", () => {
    expect(articles.map((a) => a.slug)).toEqual(["historia", "personajes", "cobertura-mundial", "wimax-bolivia", "empresas-bolivia"]);
  });

  it("cada artículo cita fuentes y tiene un «Sabías que»", () => {
    for (const a of articles) {
      expect(a.sources.length).toBeGreaterThan(3);
      expect(a.blocks.some((b) => b.k === "fact")).toBe(true);
    }
  });

  it("devuelve las 3 publicaciones más recientes", () => {
    expect(latest(3)).toHaveLength(3);
  });

  it("el autor es Calle Cucho Josue Salomon", () => {
    expect(AUTHOR).toBe("Calle Cucho Josue Salomon");
  });

  it("los países tienen coordenadas válidas", () => {
    for (const c of countries) {
      expect(Math.abs(c.lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(c.lon)).toBeLessThanOrEqual(180);
    }
  });
});

describe("formulario de contacto (Zod)", () => {
  const ok = { name: "Ana", email: "ana@correo.com", subject: "Hola", message: "Mensaje de prueba largo", website: "" };
  it("acepta datos válidos", () => expect(contactSchema.safeParse(ok).success).toBe(true));
  it("rechaza correo inválido", () => expect(contactSchema.safeParse({ ...ok, email: "x" }).success).toBe(false));
  it("rechaza honeypot lleno", () => expect(contactSchema.safeParse({ ...ok, website: "spam" }).success).toBe(false));
});
