/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 05/10/2026 */
(function(){
  var b=document.getElementById('lang');
  function set(l){document.documentElement.lang=l;b.textContent=l==='es'?'EN':'ES';try{localStorage.setItem('crb-lang',l)}catch(e){}}
  var s=null;try{s=localStorage.getItem('crb-lang')}catch(e){}
  if(s==='en'||s==='es')set(s);
  b.addEventListener('click',function(){set(document.documentElement.lang==='es'?'en':'es')});
})();
(function(){
  if(!window.RECURSOS)return;
  var l=window.RECURSOS.slice().sort(window.ordenRecursos).slice(0,3);
  window.renderRecursos(l,document.getElementById('vitrina'),'recursos/');
  var n=window.RECURSOS.filter(function(r){return r.estado==='disponible'}).length;
  document.getElementById('nRec').textContent='('+window.RECURSOS.length+')';
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
