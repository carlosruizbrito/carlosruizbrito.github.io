/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 05/10/2026 · actualizado 18/10/2026 */
(function(){
  var b=document.getElementById('lang');
  function set(l){document.documentElement.lang=l;b.textContent=l==='es'?'EN':'ES';b.setAttribute('aria-label',l==='es'?'EN · View in English':'ES · Ver en español');b.setAttribute('lang',l==='es'?'en':'es');try{localStorage.setItem('crb-lang',l)}catch(e){}}
  var s=null;try{s=localStorage.getItem('crb-lang')}catch(e){}
  if(s==='en'||s==='es')set(s);
  b.addEventListener('click',function(){set(document.documentElement.lang==='es'?'en':'es')});
})();
(function(){
  /* Recursos: disponibles como tarjeta (máx. 2) y el resto en la lista "En preparación" */
  if(!window.RECURSOS)return;
  var l=window.RECURSOS.slice().sort(window.ordenRecursos);
  var disp=l.filter(function(r){return r.estado==='disponible'}).slice(0,2);
  var prox=l.filter(function(r){return r.estado!=='disponible'}).slice(0,3);
  if(disp.length)window.renderRecursos(disp,document.getElementById('vitrina'),'recursos/');
  if(prox.length)window.renderProx(prox,document.getElementById('proxList'));else document.getElementById('prox').hidden=true;
})();
(function(){
  /* Aparición de secciones: solo si el navegador lo soporta y el usuario no pidió reducir movimiento */
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var secs=document.querySelectorAll('.sec');if(!secs.length)return;
  document.documentElement.classList.add('rv');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  secs.forEach(function(s){io.observe(s)});
})();
