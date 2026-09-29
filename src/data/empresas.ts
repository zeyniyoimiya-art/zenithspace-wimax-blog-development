import type { Article } from "./types";
import { IMG } from "./images";

export type Evidencia = "Confirmado" | "Parcial" | "No verificado";

/** Ficha de empresa boliviana. `evidencia` indica cuánto respaldo documental tiene su vínculo con WiMAX. */
export interface Empresa {
  id: string;
  nombre: string;
  tipo: string;
  fundada: string;
  wimax: string;
  cobertura: string;
  velocidades: string;
  estado: string;
  evidencia: Evidencia;
  color: string; // gradiente del monograma (no se usan logos registrados)
  mono: string;
}

export const empresas: Empresa[] = [
  {
    id: "entel", nombre: "Entel (Entel WiMAX)", tipo: "Empresa estatal (recuperada en 2008)", fundada: "Estatal desde 2008",
    wimax: "Anuncio del servicio en octubre de 2008. Estándar 802.16e, banda de 3,5 GHz.",
    cobertura: "Nueve capitales: La Paz, Cochabamba, Santa Cruz, Sucre, Tarija, Oruro, Potosí, Trinidad y Cobija (anuncio de 2008).",
    velocidades: "128 kbps a 2.048 kbps (Bs 160 a Bs 1.590 mensuales)",
    estado: "«No vigente comercialmente». Hoy: 4G LTE (700 MHz) y primera asignación de 3,5 GHz para 5G (2025).",
    evidencia: "Confirmado", color: "from-indigo-500 to-cyan-400", mono: "EN",
  },
  {
    id: "cotas", nombre: "COTAS", tipo: "Cooperativa (Santa Cruz)", fundada: "1960",
    wimax: "En octubre de 2009 eligió a Airspan (HiperMAX y MicroMAX) para una red WiMAX en 3,5 GHz con servicios triple play.",
    cobertura: "HiperMAX en Santa Cruz, La Paz y Cochabamba; MicroMAX en Sucre, Tarija, Trinidad, Oruro y Potosí.",
    velocidades: "No se halló tarifario público verificable de su servicio WiMAX.",
    estado: "Estado del servicio WiMAX no confirmado. Hoy ofrece Internet, TV por cable y telefonía fija.",
    evidencia: "Confirmado", color: "from-cyan-400 to-emerald-400", mono: "CO",
  },
  {
    id: "axs", nombre: "AXS Bolivia", tipo: "Empresa privada (La Paz)", fundada: "2000",
    wimax: "Su portafolio de banda ancha incluye ADSL, WiMAX y GPON según su perfil comercial.",
    cobertura: "Oficinas en La Paz, Cochabamba y Santa Cruz; presencia nacional con su código de larga distancia «11».",
    velocidades: "Tarifario 2017 (tecnología no especificada): 192 kbps a 1.792 kbps, desde Bs 300.",
    estado: "Orientada hoy a fibra óptica/GPON. En 2019 fue el proveedor fijo más rápido: 12,97 Mbps de descarga (nPerf).",
    evidencia: "Parcial", color: "from-fuchsia-500 to-indigo-500", mono: "AX",
  },
  {
    id: "comteco", nombre: "COMTECO", tipo: "Cooperativa (Cochabamba)", fundada: "1942",
    wimax: "No se halló evidencia pública verificable de un despliegue WiMAX masivo.",
    cobertura: "Cochabamba y alrededores, con más de 100.000 abonados.",
    velocidades: "ADSL, VDSL, HFC y fibra; 8,69 Mbps de descarga media en 2019 (nPerf).",
    estado: "Referente cooperativo de banda ancha fija y móvil. El uso de WiMAX es un dato pendiente de confirmar.",
    evidencia: "No verificado", color: "from-amber-400 to-pink-500", mono: "CM",
  },
  {
    id: "viva", nombre: "Viva (NuevaTel PCS)", tipo: "Operador móvil privado", fundada: "Grupo Trilogy International",
    wimax: "No se halló evidencia pública de un servicio WiMAX comercial; su negocio se centró en 2G/3G/4G.",
    cobertura: "Nacional móvil; 4G LTE lanzado en verano de 2015 (área de La Paz).",
    velocidades: "Tarifario 2017 de acceso (tecnología no especificada): 328 kbps a 2 Mbps.",
    estado: "Operador móvil con 4G en banda AWS (1700 MHz).",
    evidencia: "No verificado", color: "from-pink-500 to-orange-400", mono: "VI",
  },
  {
    id: "tigo", nombre: "Tigo (Millicom)", tipo: "Operador móvil privado (histórico: Telecel)", fundada: "Grupo Millicom",
    wimax: "No se halló evidencia pública de un servicio WiMAX propio en Bolivia.",
    cobertura: "Nacional; primer operador en lanzar 4G/LTE (2013) y con al menos una ciudad 4G por departamento.",
    velocidades: "Tarifario 2017 de acceso (tecnología no especificada): 160 kbps a 1.536 kbps.",
    estado: "Segundo operador móvil; Internet hogar (cable/fibra) y 4G, con 5G en expansión.",
    evidencia: "No verificado", color: "from-sky-400 to-indigo-600", mono: "TG",
  },
  {
    id: "coops", nombre: "Cooperativas y operadores regionales", tipo: "15 cooperativas de telecomunicaciones", fundada: "Varias décadas",
    wimax: "Cooperativas como COTEL (La Paz) tienen convenios con AXS para el transporte de Internet; los usos de WiMAX son dispares.",
    cobertura: "Localidades urbanas y periurbanas de cada departamento.",
    velocidades: "Variable según proveedor.",
    estado: "Modelo social nacido con COTAS (1960). Sin inventario público de despliegues WiMAX.",
    evidencia: "No verificado", color: "from-emerald-400 to-cyan-500", mono: "CP",
  },
];

export const empresasArt: Article = {
  slug: "empresas-bolivia",
  title: "Empresas que aplicaron WiMAX en Bolivia",
  kicker: "Empresas",
  summary:
    "Entel, COTAS, AXS y otras: qué hizo cada operador, con qué velocidades, dónde y qué quedó. Con nivel de evidencia para cada dato.",
  hero: IMG.towerDish,
  date: "2026-09-29",
  sources: [
    { label: "Entel Bolivia: Internet WiMAX (No vigente comercialmente)", url: "https://institucional.entel.bo/inicio3.0/index.php/internet/nuestros-servicios/internet-4g/27-personas-internet/personas-internet-otros" },
    { label: "Developing Telecoms: COTAS y Airspan (2009)", url: "https://developingtelecoms.com/telecom-technology/wireless-networks/2306-airspan-selected-by-cotas-for-multi-city-wimax-network-in-bolivia.html" },
    { label: "AXS Bolivia: Quiénes somos", url: "https://www.axsbolivia.com/quienes-somos/" },
    { label: "El Deber: AXS celebra 25 años", url: "https://eldeber.com.bo/te-puede-interesar/axs-celebra-25-anos-conectando-bolivia-y-transformando-la-vida-digital-del-pais_522360/" },
    { label: "DPL News / nPerf 2019: mejor proveedor de Internet fijo de Bolivia", url: "https://dplnews.com/este-es-el-proveedor-con-mejor-conexion-a-internet-fijo-de-bolivia/" },
    { label: "Campero (2017): Infraestructura de telecomunicaciones y TIC en Bolivia", url: "https://internetbolivia.org/wp-content/uploads/2017/05/Campero-merged.pdf" },
    { label: "Fundación Internet Bolivia: Economía Digital (2020)", url: "https://internetbolivia.org/file/2020/05/fd_economia-digital_final.pdf" },
    { label: "Rejnac: perfiles de proveedores (COTAS, COMTECO, Tigo, Viva)", url: "https://rejnac.com/internet-providers-in-bolivia" },
  ],
  blocks: [
    { k: "p", t: "Bolivia tiene un ecosistema de telecomunicaciones singular: un gigante estatal, dos operadores móviles privados, un puñado de empresas de datos y unas quince cooperativas que nacieron como servicios comunitarios de teléfonos. Cuando WiMAX apareció, cada uno reaccionó a su manera. Este artículo separa con rigor lo que está documentado de lo que solo se supone, y usa una etiqueta de evidencia —Confirmado, Parcial o No verificado— en cada tarjeta de empresa." },
    { k: "h2", t: "Entel: el operador que llevó WiMAX a las nueve capitales" },
    { k: "p", t: "Entel es la empresa con el vínculo más claro. Tras su recuperación por el Estado en 2008, la compañía anunció el 2 de octubre de ese año su servicio de Internet WiMAX para La Paz, Cochabamba, Santa Cruz, Sucre, Tarija, Oruro, Potosí, Trinidad y Cobija, con tarifas promocionales. Su documentación describe un acceso inalámbrico asimétrico de banda ancha sobre IEEE 802.16e a 3,5 GHz, sin necesidad de instalación y con equipo terminal (CPE) portable." },
    { k: "p", t: "Los planes iban de 128 kbps (Bs 160) a 2.048 kbps (Bs 1.590). Los términos y condiciones aclaran que la velocidad quedaba sujeta a factibilidad técnica. En 2017, un estudio sobre infraestructura TIC en Bolivia señalaba que Entel era el principal proveedor de WiMAX del país y que el servicio podía resultar algo inestable por las condiciones de propagación." },
    { k: "h2", t: "COTAS: la cooperativa cruceña y su apuesta con Airspan" },
    { k: "p", t: "La Cooperativa de Telecomunicaciones Santa Cruz (COTAS) fue fundada en 1960 y es un caso de estudio del modelo cooperativo. En octubre de 2009 el fabricante Airspan anunció que COTAS, descrita como la segunda mayor proveedora de telecomunicaciones del país, había elegido sus soluciones WiMAX certificadas (MicroMAX y HiperMAX) para una red de banda ancha en 3,5 GHz." },
    { k: "p", t: "El plan cubría con estaciones HiperMAX las regiones de Santa Cruz, La Paz y Cochabamba, y con MicroMAX otras cinco ciudades: Sucre, Tarija, Trinidad, Oruro y Potosí. Kurt Klein, gerente de Planificación e Ingeniería, subrayó que el equipo podía alcanzar tanto a clientes urbanos como rurales pese al terreno accidentado. No se encontró un tarifario público de ese servicio, por lo que no se citan velocidades." },
    { k: "img", img: IMG.towerDrone, caption: "Las estaciones base en torres altas eran la clave para cubrir valles y laderas." },
    { k: "h2", t: "AXS Bolivia: pionera de larga distancia y datos" },
    { k: "p", t: "AXS nació en 2000 y en noviembre de 2001, con la apertura del mercado, fue el único operador de larga distancia con presencia en las nueve capitales a través del código 11. Ese mismo año rompió el monopolio de acceso internacional al establecer una salida propia de fibra hacia cables submarinos. Su perfil comercial enumera Internet de banda ancha por ADSL, WiMAX y GPON, aunque no se hallaron detalles de cobertura WiMAX ni de velocidades propias." },
    { k: "p", t: "En la medición de nPerf de 2019, con 77.472 pruebas a los cinco mayores proveedores fijos, AXS fue el más rápido con 12,97 Mbps de descarga, seguido de Entel (9,69), COMTECO (8,69), COTAS (8,54) y Tigo (8,45 Mbps)." },
    { k: "table", caption: "nPerf 2019: Internet fijo en Bolivia (77.472 pruebas)", head: ["Proveedor", "Descarga (Mbps)", "Subida (Mbps)", "Latencia (ms)"], rows: [
      ["AXS", "12,97", "5,91", "143,23"],
      ["Entel", "9,69", "4,96", "166,27"],
      ["COMTECO", "8,69", "3,69", "156,88"],
      ["COTAS", "8,54", "2,88", "196,56"],
      ["Tigo", "8,45", "2,51", "205,81"],
    ] },
    { k: "h2", t: "COMTECO, Viva, Tigo y las cooperativas" },
    { k: "p", t: "COMTECO, fundada en 1942 en Cochabamba, es el principal proveedor de Internet de esa ciudad, con más de 100.000 abonados, y ofrece ADSL, VDSL, HFC y fibra. Viva (NuevaTel PCS, del grupo Trilogy) y Tigo (Millicom) son operadores móviles: Tigo lanzó el primer 4G LTE del país en 2013 y Viva fue el último en 2015. Para estas tres empresas no se halló evidencia pública verificable de despliegues WiMAX propios, y por eso aparecen como «No verificado» en las tarjetas." },
    { k: "p", t: "Finalmente, Bolivia cuenta con unas quince cooperativas de telecomunicaciones, entre las que destacan COTAS y COMTECO. Algunas, como COTEL, tienen convenios con AXS para el transporte de Internet. Sin un inventario público de despliegues WiMAX en cooperativas rurales, este blog prefiere no listar nombres que no pueda respaldar." },
    { k: "h2", t: "Comparativa y lecciones" },
    { k: "table", caption: "Comparativa de operadores y su relación con WiMAX", head: ["Empresa", "Fundación / origen", "WiMAX documentado", "Estado actual"], rows: [
      ["Entel", "Estatal, 2008", "2008 · 9 capitales · 3,5 GHz", "Sin comercializar; 4G y 5G"],
      ["COTAS", "1960 · cooperativa", "2009 · 8 ciudades · 3,5 GHz", "Internet, cable y telefonía"],
      ["AXS", "2000", "Incluido en portafolio", "Fibra / GPON"],
      ["COMTECO", "1942 · cooperativa", "No verificado", "ADSL, HFC y fibra"],
      ["Viva", "Trilogy", "No verificado", "4G desde 2015"],
      ["Tigo", "Millicom", "No verificado", "4G desde 2013"],
    ] },
    { k: "p", t: "La lección común es clara: WiMAX abrió el camino de la banda ancha inalámbrica en Bolivia, pero fue un capítulo breve. La combinación de equipos caros, planes de baja velocidad y la irrupción del 4G LTE con teléfonos económicos empujó a todos hacia otra tecnología. Lo que perdura es la infraestructura de torres y, sobre todo, la banda de 3,5 GHz." },
    { k: "fact", t: "Bolivia tiene unas 15 cooperativas de telecomunicaciones: un modelo social que COTAS, fundada en 1960, implantó y que otros departamentos replicaron rápidamente." },
    { k: "gallery", imgs: [IMG.laPazMarket, IMG.stadium, IMG.chapel] },
  ],
};
