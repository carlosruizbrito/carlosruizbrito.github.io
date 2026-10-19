/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 19/10/2026
   Menú móvil de las páginas internas (mismo comportamiento que el inicio). */
(function () {
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  if (!burger || !menu) return;
  var set = function (open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    var es = document.documentElement.lang !== 'en';
    burger.setAttribute('aria-label', open ? (es ? 'Cerrar menú' : 'Close menu') : (es ? 'Abrir menú' : 'Open menu'));
  };
  burger.addEventListener('click', function (e) { e.stopPropagation(); set(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) set(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { set(false); burger.focus(); }
  });
})();
