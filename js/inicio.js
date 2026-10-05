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
