/*
  Catálogo de recursos · Delivery con Charly Brito
  © Carlos Alberto Ruiz Brito · 05/10/2026

  PARA PUBLICAR UN RECURSO NUEVO:
  1. Sube su carpeta o archivos a /recursos/ (página .html, miniatura .jpg, descarga).
  2. Agrega un bloque { ... } a la lista de abajo (copia uno existente y cambia los datos).
  3. Cambia estado a "disponible" cuando ya se pueda descargar.
  El inicio (vitrina de 3) y el catálogo completo se actualizan solos.

  Campos:
  id        identificador corto, sin espacios
  estado    "disponible" | "proximamente"
  destacado true para que aparezca primero en el inicio
  fecha     fecha de publicación AAAA-MM-DD (ordena de más reciente a más antiguo)
  tema      "delivery" | "riesgos" | "infra" | "ia"
  formato   texto corto: "Excel", "PDF", "Plantilla"...
  url       página del recurso (relativa a /recursos/), vacío si es próximamente
  img       miniatura (relativa a /recursos/), vacío si no hay
*/
window.RECURSOS = [
  {
    id: "tablero-ejecutivo",
    estado: "disponible",
    destacado: true,
    fecha: "2026-10-05",
    tema: "delivery",
    formato: "Excel",
    url: "tablero-ejecutivo.html",
    img: "tablero-vista-previa.jpg",
    titulo: { es: "Tablero Ejecutivo de Delivery", en: "Executive Delivery Dashboard" },
    desc: {
      es: "Avance, SPI, CPI, aceptación del cliente y riesgos en una página, con semáforo automático y video de uso.",
      en: "Progress, SPI, CPI, client acceptance and risks on one page, with automatic status and a how-to video (Spanish)."
    }
  },
  {
    id: "registro-riesgos",
    estado: "proximamente",
    destacado: false,
    fecha: "2026-11-01",
    tema: "riesgos",
    formato: "Excel",
    url: "",
    img: "",
    titulo: { es: "Registro de riesgos", en: "Risk register" },
    desc: {
      es: "Con los 4 campos que hacen que un riesgo esté gestionado y no solo anotado.",
      en: "With the 4 fields that make a risk managed, not just listed."
    }
  },
  {
    id: "checklist-cambio-24x7",
    estado: "proximamente",
    destacado: false,
    fecha: "2026-12-01",
    tema: "infra",
    formato: "PDF",
    url: "",
    img: "",
    titulo: { es: "Checklist de cambio en sistemas 24x7", en: "24x7 change checklist" },
    desc: {
      es: "Lo que se define antes de la ventana: reversa, criterios y comunicación.",
      en: "What gets defined before the window: rollback, criteria and communication."
    }
  }
];

window.TEMAS = {
  delivery: { es: "Delivery", en: "Delivery" },
  riesgos:  { es: "Riesgos", en: "Risks" },
  infra:    { es: "Infraestructura y DR", en: "Infrastructure & DR" },
  ia:       { es: "IA aplicada", en: "Applied AI" }
};

/* Dibuja tarjetas. base = ruta hacia /recursos/ desde la página que llama ("recursos/" o ""). */
window.renderRecursos = function (lista, cont, base) {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  cont.innerHTML = lista.map(function (r) {
    var live = r.estado === "disponible" && r.url;
    var tema = (window.TEMAS[r.tema] || { es: r.tema, en: r.tema });
    var tag = live
      ? '<span class="tag ok"><span class="es">Disponible · ' + esc(r.formato) + '</span><span class="en">Available · ' + esc(r.formato) + '</span></span>'
      : '<span class="tag"><span class="es">Próximamente</span><span class="en">Coming soon</span></span>';
    var img = r.img ? '<img class="thumb" src="' + base + esc(r.img) + '" alt="" loading="lazy">' : '';
    var body = tag + img +
      '<span class="topic"><span class="es">' + esc(tema.es) + '</span><span class="en">' + esc(tema.en) + '</span></span>' +
      '<h3 class="es">' + esc(r.titulo.es) + '</h3><h3 class="en">' + esc(r.titulo.en) + '</h3>' +
      '<p class="es">' + esc(r.desc.es) + '</p><p class="en">' + esc(r.desc.en) + '</p>' +
      (live ? '<span class="more"><span class="es">Ver recurso →</span><span class="en">View resource →</span></span>' : '');
    return live
      ? '<a class="tool live" href="' + base + esc(r.url) + '">' + body + '</a>'
      : '<div class="tool">' + body + '</div>';
  }).join("");
};

/* Orden: disponibles destacados, disponibles por fecha, luego próximamente por fecha. */
window.ordenRecursos = function (a, b) {
  var da = a.estado === "disponible", db = b.estado === "disponible";
  if (da !== db) return da ? -1 : 1;
  if (da && a.destacado !== b.destacado) return a.destacado ? -1 : 1;
  return da ? (b.fecha > a.fecha ? 1 : -1) : (a.fecha > b.fecha ? 1 : -1);
};
