/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 14/10/2026 */
(function(){
  var b=document.getElementById('lang');
  var T={es:'Tablero Ejecutivo de Delivery · Plantilla gratuita · Delivery con Charly Brito',en:'Executive Delivery Dashboard · Free template · Delivery con Charly Brito'};
  function set(l,guardar){
    document.documentElement.lang=l;
    b.textContent=l==='es'?'EN':'ES';
    document.title=T[l];
    document.querySelectorAll('video').forEach(function(v){if(!v.classList.contains(l)&&!v.paused)v.pause()});
    if(guardar){try{localStorage.setItem('crb-lang',l)}catch(e){}}
  }
  var q=null;try{q=new URLSearchParams(location.search).get('lang')}catch(e){}
  var s=null;try{s=localStorage.getItem('crb-lang')}catch(e){}
  if(q==='en'||q==='es')set(q,true);else if(s==='en'||s==='es')set(s,false);
  b.addEventListener('click',function(){set(document.documentElement.lang==='es'?'en':'es',true)});
})();
