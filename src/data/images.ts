import type { Img } from "./types";

// Catálogo de imágenes de Pexels (licencia Pexels, uso gratuito con atribución al autor).
// Cada imagen se sirve desde el CDN de Pexels con compresión automática.

/** Construye la URL del CDN de Pexels con el ancho pedido */
export const px = (id: number, w = 1200, h = 720): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}`;

export const IMG = {
  towers: { id: 9290878, alt: "Torres de telecomunicaciones con antenas y parábolas bajo un cielo nublado", credit: "Barnabas Davoti" },
  towerSilhouette: { id: 15104403, alt: "Torre de comunicaciones recortada contra el cielo", credit: "Wallace Chuck" },
  towerForest: { id: 14356121, alt: "Torre de telecomunicaciones sobre los árboles", credit: "Sami Aksu" },
  towerDish: { id: 9290873, alt: "Torre con antenas parabólicas de microondas", credit: "Barnabas Davoti" },
  towerDrone: { id: 15104408, alt: "Torre de radio vista con dron bajo un cielo dramático", credit: "Wallace Chuck" },
  towerBlue: { id: 39528387, alt: "Dos torres de telecomunicaciones contra un cielo azul", credit: "William Finn" },
  repair: { id: 19728112, alt: "Técnicos reparando una torre celular", credit: "Barbara Reis" },
  redTower: { id: 579471, alt: "Torre roja de comunicaciones con antenas", credit: "Miguel Á. Padriñán" },
  rooftop: { id: 17869674, alt: "Antenas de telecomunicaciones en una azotea urbana", credit: "Seyfettin Geçit" },
  cellTower: { id: 15407743, alt: "Torre celular alta contra un cielo azul intenso", credit: "Ulrick Trappschuh" },
  switchGear: { id: 4657256, alt: "Conmutador de red con cables conectados", credit: "Brett Sayles" },
  laPaz: { id: 5198849, alt: "Panorámica de La Paz, Bolivia, con edificios y cielo dramático", credit: "Julia Volk" },
  laPazCable: { id: 36303148, alt: "Teleférico sobre el paisaje urbano de La Paz al atardecer", credit: "Shiwa Yachachin" },
  laPazHills: { id: 17756468, alt: "Casas apiladas en las laderas de La Paz", credit: "Gabriel Ramos" },
  laPazMarket: { id: 36303147, alt: "Mercado animado en La Paz, Bolivia", credit: "Shiwa Yachachin" },
  stadium: { id: 26627808, alt: "Vista aérea de un estadio en La Paz rodeado de edificios", credit: "Wycher van Vliet" },
  condoriri: { id: 19783220, alt: "Mujer con una mula en los Andes bolivianos (Condoriri)", credit: "Gabriel Ramos" },
  huayna: { id: 18046333, alt: "Panorámica del Huayna Potosí con picos nevados", credit: "Gabriel Ramos" },
  villageRocks: { id: 17783750, alt: "Aldea boliviana rodeada de formaciones rocosas", credit: "Robert Acevedo" },
  chapel: { id: 21614377, alt: "Capilla en el campo de Sucre rodeada de colinas", credit: "Robert Acevedo" },
  desert: { id: 5656678, alt: "Paisaje árido con montaña y lago seco en Bolivia", credit: "Julia Volk" },
  tarata: { id: 23232284, alt: "Fachada histórica de iglesia en Cochabamba, Bolivia", credit: "Misk'i Marie" },
  kualaLumpur: { id: 12267675, alt: "Vista aérea nocturna de Kuala Lumpur", credit: "Pok Rie" },
  nightCity: { id: 37894521, alt: "Calles iluminadas de una ciudad vistas de noche desde el aire", credit: "Yunus Tuğ" },
  colombo: { id: 36703583, alt: "Horizonte iluminado de Colombo de noche", credit: "Thilina Alagiyawanna" },
} satisfies Record<string, Img>;
