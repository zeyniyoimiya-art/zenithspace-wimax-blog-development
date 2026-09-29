import type { Article } from "./types";
import { IMG } from "./images";

/** Ficha de un personaje. Sin fotos: se usan monogramas para no atribuir retratos sin licencia verificada. */
export interface Person {
  name: string;
  initials: string;
  role: string;
  org: string;
  bio: string;
  tie: "Directo" | "Indirecto" | "Sin vínculo verificado";
}

export const people: Person[] = [
  {
    name: "Roger B. Marks",
    initials: "RM",
    role: "Presidente del IEEE 802.16 Working Group (desde 1998)",
    org: "NIST / IEEE / WiMAX Forum",
    bio: "Inició el grupo de trabajo, fue elegido presidente diez veces y lideró el estándar 802.16. Más tarde fue vicepresidente de Tecnología y Estándares del WiMAX Forum (2009–2011) y coautor del libro «WirelessMAN».",
    tie: "Directo",
  },
  {
    name: "Ron Resnick",
    initials: "RR",
    role: "Presidente y Chairman del WiMAX Forum (desde 2004)",
    org: "Intel / WiMAX Forum",
    bio: "Ejecutivo de Intel que en junio de 2002 lanzó el negocio de banda ancha inalámbrica de la compañía, centrado en un módem WiMAX. Encabezó el Foro durante su etapa de mayor expansión.",
    tie: "Directo",
  },
  {
    name: "Craig McCaw",
    initials: "CM",
    role: "Pionero de la telefonía celular; impulsor de Clearwire",
    org: "Clearwire",
    bio: "Empresario estadounidense, fundador de McCaw Cellular, que apostó por el espectro de 2,5 GHz y por WiMAX como base de la red de Clearwire.",
    tie: "Directo",
  },
  {
    name: "Dan Hesse",
    initials: "DH",
    role: "CEO de Sprint (2007–2014)",
    org: "Sprint Nextel",
    bio: "Según la crónica de Clearwire, retomó en 2008 las negociaciones que dieron origen al joint venture con Google, Intel y otros socios. Bajo su mandato Sprint lanzó Xohm/CLEAR y después migró a LTE.",
    tie: "Directo",
  },
  {
    name: "Denis Sverdlov",
    initials: "DS",
    role: "Fundador de Yota (Scartel)",
    org: "Yota, Rusia",
    bio: "Su empresa construyó la mayor red WiMAX móvil del mundo: 250.000 usuarios activos a fines de 2009 y más de 300.000 en febrero de 2010, con expansión a Nicaragua, Perú y Bielorrusia.",
    tie: "Directo",
  },
  {
    name: "Andrew Viterbi",
    initials: "AV",
    role: "Cofundador de Qualcomm; creador del algoritmo de Viterbi",
    org: "Qualcomm / USC",
    bio: "Medalla Nacional de Ciencia (2008) y Medalla de Honor del IEEE (2010). Su algoritmo de decodificación es una pieza básica de las comunicaciones digitales inalámbricas. No se encontró evidencia de que participara en el diseño de WiMAX: su legado es CDMA y decodificación, no 802.16.",
    tie: "Indirecto",
  },
  {
    name: "David J. Farber",
    initials: "DF",
    role: "Científico de la computación y pionero de Internet",
    org: "Carnegie Mellon / Universidad de Pensilvania",
    bio: "Figura histórica de las redes de computadoras. En la investigación para este blog no se halló una fuente que lo vincule directamente con WiMAX, por lo que se lista solo como referente del contexto de redes.",
    tie: "Sin vínculo verificado",
  },
  {
    name: "Steve Jobs",
    initials: "SJ",
    role: "Cofundador y CEO de Apple",
    org: "Apple",
    bio: "No se encontró una declaración verificable de Jobs sobre WiMAX. Sí es un hecho comprobable que ningún iPhone incorporó WiMAX y que Apple adoptó LTE. Cualquier cita atribuida sin fuente primaria debe tomarse con cautela.",
    tie: "Sin vínculo verificado",
  },
];

export const personajes: Article = {
  slug: "personajes",
  title: "Personajes clave: quiénes construyeron (y quiénes vieron pasar) WiMAX",
  kicker: "Personajes",
  summary:
    "Ingenieros del IEEE, directivos del WiMAX Forum y ejecutivos de Sprint y Clearwire: las personas detrás del estándar 802.16.",
  hero: IMG.switchGear,
  date: "2026-01-19",
  readMin: 7,
  sources: [
    { label: "Roger B. Marks — CV oficial", url: "https://consensii.com/marks/Marks-CV.pdf" },
    { label: "Ron Resnick — perfil (presidente del WiMAX Forum desde 2004)", url: "https://vanceafbuptclass73-01.weebly.com/ron-resnick.html" },
    { label: "IEEE 802.16 — carta de enlace a Ron Resnick, 2008", url: "https://www.ieee802.org/16/liaison/docs/L80216-08_016.pdf" },
    { label: "Wikipedia: Clearwire", url: "https://en.wikipedia.org/wiki/Clearwire" },
    { label: "Wikipedia: Andrew Viterbi", url: "https://en.wikipedia.org/wiki/Andrew_Viterbi" },
    { label: "IEEE Spectrum — Medal of Honor 2010: Andrew J. Viterbi", url: "https://spectrum.ieee.org/2010-medal-of-honor-winner-andrew-j-viterbi" },
    { label: "Samsung / Yota — despliegue de Mobile WiMAX en Rusia (2010)", url: "https://www.samsung.com/global/business/networks/insights/press-release/samsung-and-yota-accelerate-nationwide-mobile-wimax-deployment-in-russia/" },
  ],
  blocks: [
    { k: "p", t: "Ninguna tecnología nace sola. Detrás de WiMAX hubo tres comunidades que rara vez coinciden en una misma mesa: ingenieros que escriben estándares, ejecutivos que construyen consorcios y empresarios que apuestan miles de millones a una red. Este artículo recorre a los protagonistas verificables y aclara, con honestidad, a quiénes se suele asociar con WiMAX sin una base documental sólida." },
    { k: "h2", t: "Los ingenieros del IEEE: Roger B. Marks y el grupo 802.16" },
    { k: "p", t: "El nombre más importante del estándar es Roger B. Marks. Trabajaba en el NIST, en Boulder (Colorado), cuando en 1998 impulsó el grupo de trabajo que redactaría IEEE 802.16. Fue su presidente durante más de una década, organizó cerca de cien sesiones plenarias en países como Canadá, China, Egipto, Finlandia, India, Israel, Italia, Japón, Corea, Rusia, Singapur, España, Suiza, Taiwán y EE. UU. —con asistencias de hasta 462 personas— y lideró la gestión de las políticas de patentes del grupo." },
    { k: "p", t: "Marks también fue clave en la diplomacia técnica: encabezó los esfuerzos para que la UIT reconociera 802.16 como tecnología IMT-2000 y, después, como IMT-Advanced. Su currículum sostiene que el trabajo dio lugar a decenas de millones de dispositivos desplegados. En 2009 pasó al WiMAX Forum como vicepresidente de Tecnología y Estándares, donde dirigió la certificación de WiMAX móvil, y es coautor de «WirelessMAN: Inside the IEEE 802.16 Standard for Wireless Metropolitan Area Networks»." },
    { k: "img", img: IMG.repair, caption: "Detrás de cada red hay técnicos e instaladores: la parte menos visible de la historia de WiMAX." },
    { k: "h2", t: "Los líderes del WiMAX Forum" },
    { k: "p", t: "Mientras el IEEE definía la capa física y de enlace, el WiMAX Forum se encargaba de lo que el estándar deja abierto: perfiles, pruebas de interoperabilidad y marca. Ron Resnick, ejecutivo de Intel, presidió el Foro desde 2004. En Intel había lanzado en junio de 2002 el negocio de banda ancha inalámbrica de la empresa, con un módem de banda base para WiMAX. En una carta de marzo de 2008, el propio Marks se dirige a él como «Presidente, WiMAX Forum» para coordinar la respuesta a la UIT." },
    { k: "p", t: "El peso de Intel fue determinante: la compañía invirtió en Clearwire, integró radios WiMAX en portátiles y promovió el ecosistema de chips. Esa alianza entre estándar, fabricante de silicio y operador fue, a la vez, la fuerza y la debilidad de WiMAX." },
    { k: "h2", t: "Los ejecutivos: Sprint, Clearwire y Yota" },
    { k: "h3", t: "Craig McCaw y Clearwire" },
    { k: "p", t: "Clearwire, respaldada por el pionero celular Craig McCaw, acumuló espectro de 2,5 GHz y apostó por WiMAX. Llegó a operar en 88 mercados de EE. UU., con cobertura potencial de 134 millones de personas." },
    { k: "h3", t: "Dan Hesse y Sprint" },
    { k: "p", t: "Sprint y Clearwire anunciaron una alianza en julio de 2007 que se disolvió a finales de ese año. En 2008, el nuevo CEO de Sprint, Dan Hesse, retomó las conversaciones para formar una sociedad que atrajera capital de Google, Intel y otros. El resultado fue la marca CLEAR y la primera red WiMAX móvil de escala nacional en EE. UU. Años después, Sprint completó la adquisición y apagó WiMAX en 2015." },
    { k: "h3", t: "Denis Sverdlov y Yota" },
    { k: "p", t: "Fuera de EE. UU., el caso más notable es el de Yota, en Rusia. Su red pasó de tres ciudades (Moscú, San Petersburgo, Ufá) con más de 300.000 abonados en febrero de 2010 a planes de 180 ciudades y licencias en Nicaragua, Perú y Bielorrusia. Fue, durante un tiempo, la mayor red WiMAX móvil del planeta antes de migrar a LTE." },
    { k: "table", caption: "Resumen de personajes y su vínculo documentado con WiMAX", head: ["Persona", "Rol", "Vínculo con WiMAX"], rows: [
      ["Roger B. Marks", "Chair IEEE 802.16; VP WiMAX Forum", "Directo (estándar y certificación)"],
      ["Ron Resnick", "Presidente WiMAX Forum; Intel", "Directo (consorcio e industria)"],
      ["Craig McCaw", "Impulsor de Clearwire", "Directo (operador)"],
      ["Dan Hesse", "CEO de Sprint", "Directo (operador)"],
      ["Denis Sverdlov", "Fundador de Yota", "Directo (operador)"],
      ["Andrew Viterbi", "Cofundador de Qualcomm", "Indirecto (teoría de decodificación)"],
      ["David J. Farber", "Pionero de Internet", "Sin vínculo verificado"],
      ["Steve Jobs", "CEO de Apple", "Sin declaración verificada"],
    ] },
    { k: "h2", t: "Nota de verificación: Viterbi, Farber y Jobs" },
    { k: "p", t: "Al preparar este artículo se buscó activamente cualquier relación entre WiMAX y tres nombres célebres. El resultado: Andrew Viterbi, cofundador de Qualcomm, es el inventor del algoritmo que lleva su nombre y contribuyó de forma decisiva a CDMA; recibió la Medalla Nacional de Ciencia en 2008 y la Medalla de Honor del IEEE en 2010. Su algoritmo se usa en todos los estándares digitales 2G y 3G, y es habitual en la decodificación de códigos convolucionales de otros sistemas, pero no hay evidencia de que participara en el diseño de WiMAX." },
    { k: "p", t: "David J. Farber es un referente de la historia de las redes de computadoras, pero no se halló ninguna fuente que lo relacione con 802.16. Y sobre Steve Jobs no existe, en las fuentes consultadas, una declaración verificable sobre WiMAX; lo comprobable es que Apple nunca lanzó un iPhone con WiMAX y adoptó LTE. Se prefirió indicarlo así antes que inventar citas." },
    { k: "fact", t: "El algoritmo de Viterbi, creado a finales de los años sesenta para simplificar un curso universitario, terminó siendo la base de la decodificación en telefonía móvil, comunicaciones espaciales, reconocimiento de voz e incluso análisis de ADN." },
    { k: "gallery", imgs: [IMG.towerForest, IMG.cellTower, IMG.towerBlue] },
  ],
};
