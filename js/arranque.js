/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 18/10/2026
   Secuencia de entrada del hero. Se carga sin defer en <head> para armarse antes del primer pintado.
   Solo corre una vez por visita y nunca con "reducir movimiento". Al terminar se retira sola. */
(function () {
  var d = document.documentElement;
  try { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) {}
  try { if (sessionStorage.getItem('crb-intro')) return; sessionStorage.setItem('crb-intro', '1'); } catch (e) {}
  d.classList.add('anim');
  var started = false, cleaned = false, bootTimer = 0, safety = 0;
  function clean() {
    if (cleaned) return; cleaned = true;
    clearTimeout(safety);
    document.removeEventListener('animationend', onEnd, true);
    d.classList.remove('anim', 'go');
  }
  function onEnd(e) {
    if (e.target.classList && e.target.classList.contains('stats')) clean();
  }
  function start() {
    if (started) return; started = true;
    clearTimeout(bootTimer);
    document.addEventListener('animationend', onEnd, true);
    safety = setTimeout(clean, 2200);
    d.classList.add('go');
  }
  function boot() {
    bootTimer = setTimeout(start, 900);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start, start); else start();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
