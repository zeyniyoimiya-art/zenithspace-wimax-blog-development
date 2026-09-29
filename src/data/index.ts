import type { Article } from "./types";
import { historia } from "./historia";
import { personajes } from "./personajes";
import { cobertura } from "./cobertura";
import { bolivia } from "./bolivia";
import { empresasArt } from "./empresas";

/** Autor del blog */
export const AUTHOR = "Calle Cucho Josue Salomon";
export const AUTHOR_ROLE = "Estudiante de Sistemas Informáticos, INCOS El Alto";

/** Todos los artículos, en orden de lectura recomendado */
export const articles: Article[] = [historia, personajes, cobertura, bolivia, empresasArt];

/** Ruta de un artículo */
export const articlePath = (a: Article) => `/blog/${a.slug}`;

/** Últimas publicaciones (por fecha descendente) */
export const latest = (n: number): Article[] =>
  [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);

/** Redes sociales del autor. Añade aquí las URLs reales; los enlaces vacíos no se muestran. */
export const SOCIALS: { label: string; url: string; icon: string }[] = [];

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" });
