/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 17/11/2026
   Idioma entre páginas: el inicio tiene URL por idioma (/ y /en/); las páginas internas cambian con el botón.
   - En el inicio (html[data-pagina-idioma]) guarda el idioma de la página para que el CV y Recursos abran igual.
   - En cualquier página, los enlaces al inicio (a[data-home]) llevan a /en/ cuando la página está en inglés. */
(function () {
  var d = document.documentElement;
  if (d.hasAttribute('data-pagina-idioma')) { try { localStorage.setItem('crb-lang', d.lang); } catch (e) {} }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-home]');
    if (!a || d.lang !== 'en') return;
    var h = a.getAttribute('href') || '/';
    var hash = '', i = h.indexOf('#');
    if (i >= 0) { hash = h.slice(i); h = h.slice(0, i); }
    if (!/en\/$/.test(h)) a.setAttribute('href', h.replace(/\/?$/, '/') + 'en/' + hash);
  });
})();
