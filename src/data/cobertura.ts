import type { Article } from "./types";
import { IMG } from "./images";

/** País/mercado con despliegue documentado de WiMAX (marcador del globo 3D) */
export interface Country {
  id: string;
  name: string;
  flag: string;
  lat: number;
  lon: number;
  operators: string;
  period: string;
  peak: string; // usuarios pico (solo cifras con fuente)
  note: string;
  verified: boolean; // true si la cifra tiene fuente pública citada
}

export const countries: Country[] = [
  { id: "us", name: "Estados Unidos", flag: "🇺🇸", lat: 39.8, lon: -98.5, operators: "Sprint (Xohm/CLEAR), Clearwire", period: "2008 – 2015 (red apagada en marzo de 2016)", peak: "≈11 millones de suscriptores (incl. mayoristas), enero de 2012", note: "88 mercados y 134 millones de personas cubiertas potencialmente. Primer smartphone: HTC EVO 4G (2010).", verified: true },
  { id: "jp", name: "Japón", flag: "🇯🇵", lat: 36.2, lon: 138.2, operators: "UQ Communications (grupo KDDI)", period: "2009 en adelante", peak: "Más de la mitad de la población cubierta (2009)", note: "Más de 20 socios MVNO. Después evolucionó a WiMAX 2+, compatible con TD-LTE.", verified: true },
  { id: "kr", name: "Corea del Sur", flag: "🇰🇷", lat: 36.5, lon: 127.9, operators: "KT (WiBro)", period: "2006 en adelante", peak: "≈150.000 abonados en el 1T 2008", note: "WiBro aportó tecnología al estándar; en 2009 KT cubría más de la mitad de la población.", verified: true },
  { id: "ru", name: "Rusia", flag: "🇷🇺", lat: 58.0, lon: 50.0, operators: "Yota (Scartel)", period: "2007/2009 – 2012", peak: ">300.000 abonados (febrero de 2010)", note: "Mayor red WiMAX móvil del mundo; migró a LTE desde 2011–2012.", verified: true },
  { id: "in", name: "India", flag: "🇮🇳", lat: 21.0, lon: 78.0, operators: "BSNL, Tata Communications, otros", period: "2008 en adelante", peak: "Cifra consolidada no verificada", note: "BSNL planificó una gran red en Gujarat, Maharashtra, Goa y Andhra Pradesh (cerca de 400 localidades).", verified: false },
  { id: "pk", name: "Pakistán", flag: "🇵🇰", lat: 30.4, lon: 69.3, operators: "Wateen, Qubee, Mobilink Infinity, Wi-Tribe", period: "2007 en adelante", peak: "25.000 abonados de Wateen (junio de 2008)", note: "Cuatro operadores WiMAX; Wateen pidió 198.000 CPE a Motorola.", verified: true },
  { id: "my", name: "Malasia", flag: "🇲🇾", lat: 4.2, lon: 102.0, operators: "Packet One (P1)", period: "2008 en adelante", peak: "Cifra no verificada", note: "Citado por el WiMAX Forum como red en expansión en 2009.", verified: false },
  { id: "au", name: "Australia", flag: "🇦🇺", lat: -25.3, lon: 133.8, operators: "BigAir", period: "2000s – 2010s", peak: "Cifra no verificada", note: "ISP inalámbrico regional con WiMAX.", verified: false },
  { id: "za", name: "Sudáfrica", flag: "🇿🇦", lat: -30.6, lon: 22.9, operators: "Telkom («Do Broadband Wireless»), iBurst, Neotel", period: "2007 en adelante", peak: "Cifra no verificada", note: "Telkom lanzó WiMAX comercial en junio de 2007 en Pretoria, Johannesburgo, Durban y Ciudad del Cabo.", verified: false },
  { id: "pe", name: "Perú", flag: "🇵🇪", lat: -9.2, lon: -75.0, operators: "Yota (licencia 2010)", period: "2010", peak: "Cifra no verificada", note: "En enero de 2010 Yota obtuvo espectro para una red nacional.", verified: false },
  { id: "ni", name: "Nicaragua", flag: "🇳🇮", lat: 12.9, lon: -85.2, operators: "Yota (piloto en Managua)", period: "2009 – 2010", peak: "Piloto", note: "Ofrecía datos ilimitados por unos 28 USD/mes, frente a ≈60 USD de la 3G local.", verified: true },
  { id: "bo", name: "Bolivia", flag: "🇧🇴", lat: -16.5, lon: -64.7, operators: "Entel, COTAS, AXS (y otros)", period: "2008 en adelante", peak: "Sin cifra pública de abonados WiMAX", note: "Banda de 3,5 GHz. Entel anunció WiMAX en nueve capitales en octubre de 2008.", verified: true },
];

export const cobertura: Article = {
  slug: "cobertura-mundial",
  title: "Cobertura mundial: el mapa de WiMAX en cinco continentes",
  kicker: "Cobertura",
  summary:
    "519 despliegues en 146 países hacia 2009: de Baltimore a Moscú, de Seúl a La Paz. Explora el globo interactivo y compara los grandes mercados.",
  hero: IMG.nightCity,
  date: "2026-01-26",
  readMin: 8,
  sources: [
    { label: "WiMAX Forum vía RF Globalnet: 519 despliegues en 146 países (2009)", url: "https://www.rfglobalnet.com/doc/wimax-deployments-go-global-with-519-in-146-0001" },
    { label: "Wikipedia: Clearwire (88 mercados, ≈11 M de suscriptores)", url: "https://en.wikipedia.org/wiki/Clearwire" },
    { label: "Samsung/Yota: 300.000 abonados en Rusia (feb. 2010)", url: "https://www.samsung.com/global/business/networks/insights/press-release/samsung-and-yota-accelerate-nationwide-mobile-wimax-deployment-in-russia/" },
    { label: "Maravedis vía Wireless Telecom: ≈25 M de abonados WiMAX (2011)", url: "https://wirelesstelecom.wordpress.com/2012/05/29/the-rise-and-fall-of-wimax-2/" },
    { label: "Fierce Broadband Wireless: KT y Wateen, primer trimestre de 2008", url: "https://www.southasiainvestor.com/2009/02/wimax-broadband-growing-in-pakistan.html" },
    { label: "Light Reading: WiMax — What's Working Now (BSNL, Telkom, Tata)", url: "https://www.lightreading.com/business-management/wimax-what-s-working-now" },
    { label: "ITWeb: Telkom unveils WiMax offerings (2007)", url: "https://www.itweb.co.za/article/telkom-unveils-wimax-offerings/KPNG8v8Xl85v4mwD" },
    { label: "OSIPTEL: Entel lanza WiMAX a tarifas promocionales (2008)", url: "https://www.gob.pe/institucion/osiptel/noticias/177600-entel-lanza-wimax-a-tarifas-promocionales" },
  ],
  blocks: [
    { k: "p", t: "A finales de 2009, cuando el mundo aún debatía si WiMAX o LTE sería «el» estándar 4G, el WiMAX Forum contabilizaba 519 redes en 146 países, incluidas 95 desplegadas por operadores móviles 2G. Solo ese año se sumaron 112. Esa cifra explica por qué, durante un tiempo, WiMAX fue considerado la tecnología inalámbrica de banda ancha con más presencia global. Este artículo recorre sus mercados principales." },
    { k: "h2", t: "Norteamérica: el experimento de Sprint y Clearwire" },
    { k: "p", t: "Estados Unidos fue el mercado más grande y también el más visible. Sprint debutó con su servicio Xohm en Baltimore en 2008 —el lanzamiento estaba previsto para abril y se retrasó a septiembre— y luego lo integró en la marca CLEAR de Clearwire. Llegó a cubrir 88 mercados con 134 millones de personas dentro de su huella potencial y unos 11 millones de suscriptores a principios de 2012, cifra que incluye clientes mayoristas y de socios como cableoperadores." },
    { k: "p", t: "Otros actores más pequeños, como Towerstream, desplegaron WiMAX fijo 802.16e en varias ciudades para clientes empresariales. El desenlace es conocido: cierre de CLEAR el 6 de noviembre de 2015 y apagado total de la red en marzo de 2016." },
    { k: "h2", t: "Asia: donde WiMAX tuvo su mejor momento" },
    { k: "h3", t: "Corea del Sur y WiBro" },
    { k: "p", t: "Corea del Sur fue pionera con WiBro, variante coreana que alimentó el estándar. KT tenía cerca de 150.000 abonados en el primer trimestre de 2008 y hacia 2009 cubría más de la mitad de la población. Al igual que en otros mercados, Corea pasó después a LTE." },
    { k: "h3", t: "Japón: UQ Communications" },
    { k: "p", t: "UQ Communications, del grupo KDDI, cubría más de la mitad de Japón en 2009 y comercializaba servicio a través de más de 20 socios MVNO. Su evolución, WiMAX 2+, se hizo compatible con TD-LTE, una salida elegante que pocos operadores pudieron replicar." },
    { k: "h3", t: "India, Pakistán y Malasia" },
    { k: "p", t: "En el sur de Asia, WiMAX prometía saltarse la falta de infraestructura fija. BSNL, el operador estatal indio, planificó una red de escala enorme en varios estados, con casi 400 localidades. En Pakistán, cuatro operadores —Wateen, Qubee, Mobilink Infinity y Wi-Tribe— compitieron; Wateen tenía 25.000 abonados a mediados de 2008 tras ordenar 198.000 equipos de cliente. En Malasia, Packet One fue una de las redes citadas por el Foro en 2009." },
    { k: "img", img: IMG.kualaLumpur, caption: "Kuala Lumpur, sede de Packet One y de fabricantes como Greenpacket." },
    { k: "h2", t: "Europa y Rusia: Yota, la mayor red móvil" },
    { k: "p", t: "En Rusia, Yota (Scartel) construyó la mayor red de WiMAX móvil del mundo. Tenía 250.000 usuarios activos a finales de 2009, ganaba más de 2.300 abonados por día y en febrero de 2010 superaba los 300.000 en tres ciudades. Samsung le suministraría más de 5.000 estaciones base adicionales, con la meta de 180 ciudades. Sin embargo, la propia Yota anunció LTE en 2011 y en 2012 ya migraba sus clientes." },
    { k: "h2", t: "África: rellenar el hueco del ADSL" },
    { k: "p", t: "En Sudáfrica, Telkom lanzó en junio de 2007 «Do Broadband Wireless», su oferta WiMAX comercial, como alternativa al ADSL en zonas sin cobertura de cobre: Pretoria, Johannesburgo, Durban y Ciudad del Cabo, con planes de ampliarla a más de una docena de ciudades. Ese patrón —WiMAX como complemento del DSL— se repitió en Noruega, Alemania y otros países." },
    { k: "h2", t: "Latinoamérica: Bolivia, Perú y Nicaragua" },
    { k: "p", t: "En la región, WiMAX ocupó sobre todo la banda de 3,5 GHz. Yota probó suerte en Nicaragua y Perú en 2009–2010. Bolivia desplegó WiMAX con Entel desde octubre de 2008 y con COTAS desde 2009; ese caso se analiza en detalle en los dos artículos siguientes." },
    { k: "table", caption: "Grandes mercados WiMAX y cifras verificables", head: ["País", "Operador", "Cifra citada", "Fuente/fecha"], rows: [
      ["EE. UU.", "Clearwire/Sprint", "≈11 M de suscriptores", "Ene. 2012"],
      ["Rusia", "Yota", ">300.000 abonados", "Feb. 2010"],
      ["Corea del Sur", "KT", "≈150.000 abonados", "1T 2008"],
      ["Pakistán", "Wateen", "25.000 abonados", "Jun. 2008"],
      ["Mundo", "Todos", "519 redes en 146 países", "Dic. 2009"],
      ["Mundo", "Todos", "≈25 M de abonados", "Fin de 2011 (Maravedis)"],
    ] },
    { k: "fact", t: "En 2008 el número medio de abonados por red WiMAX era de apenas unos 15.000. La fragmentación de miles de pequeños despliegues frenó la economía de escala de los dispositivos." },
    { k: "gallery", imgs: [IMG.colombo, IMG.rooftop, IMG.towers] },
  ],
};
