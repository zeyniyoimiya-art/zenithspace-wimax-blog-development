// Tipos del contenido del blog (equivalente a los schemas Zod/tRPC del backend)

/** Imagen con atribución obligatoria */
export interface Img {
  id: number;
  alt: string;
  credit: string;
}

/** Bloques de contenido de un artículo */
export type Block =
  | { k: "h2"; t: string }
  | { k: "h3"; t: string }
  | { k: "p"; t: string }
  | { k: "list"; items: string[] }
  | { k: "quote"; t: string; by: string }
  | { k: "table"; caption: string; head: string[]; rows: string[][] }
  | { k: "img"; img: Img; caption: string }
  | { k: "gallery"; imgs: Img[] }
  | { k: "fact"; t: string };

export interface Source {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  hero: Img;
  date: string; // ISO
  readMin: number;
  blocks: Block[];
  sources: Source[];
}
