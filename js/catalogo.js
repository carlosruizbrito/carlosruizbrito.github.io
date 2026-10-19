/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 05/10/2026 · actualizado 18/10/2026 */
(function(){
  var b=document.getElementById('lang');
  function set(l){document.documentElement.lang=l;b.textContent=l==='es'?'EN':'ES';b.setAttribute('aria-label',l==='es'?'EN · View in English':'ES · Ver en español');b.setAttribute('lang',l==='es'?'en':'es');try{localStorage.setItem('crb-lang',l)}catch(e){}pintar()}
  var actual='todos', MIN_FILTROS=6;
  var F=document.getElementById('filtros'),C=document.getElementById('catalogo'),N=document.getElementById('conteo'),P=document.getElementById('prox'),PL=document.getElementById('proxList');
  var todos=(window.RECURSOS||[]).slice().sort(window.ordenRecursos);
  var temas=['todos'].concat(Object.keys(window.TEMAS||{}).filter(function(t){return todos.some(function(r){return r.tema===t})}));
  /* Los filtros solo aparecen cuando hay suficientes recursos para que sirvan */
  F.hidden=todos.length<MIN_FILTROS;
  function nombre(t){return t==='todos'?{es:'Todos',en:'All'}:window.TEMAS[t]}
  function pintar(){
    var l=document.documentElement.lang==='en'?'en':'es';
    F.innerHTML=temas.map(function(t){return '<button type="button" class="chip" data-t="'+t+'" aria-pressed="'+(t===actual)+'">'+nombre(t)[l]+'</button>'}).join('');
    var lista=todos.filter(function(r){return actual==='todos'||r.tema===actual});
    var disp=lista.filter(function(r){return r.estado==='disponible'});
    var prox=lista.filter(function(r){return r.estado!=='disponible'});
    N.textContent=l==='en'
      ?(disp.length+' available · '+prox.length+' coming soon')
      :(disp.length+(disp.length===1?' disponible':' disponibles')+' · '+prox.length+' en preparación');
    if(disp.length)window.renderRecursos(disp,C,'');
    else C.innerHTML='<div class="empty">'+(l==='en'?'No resources on this topic yet.':'Aún no hay recursos de este tema.')+'</div>';
    P.hidden=!prox.length; if(prox.length)window.renderProx(prox,PL);
  }
  F.addEventListener('click',function(e){var t=e.target.closest('.chip');if(!t)return;actual=t.getAttribute('data-t');pintar()});
  b.addEventListener('click',function(){set(document.documentElement.lang==='es'?'en':'es')});
  var s=null;try{s=localStorage.getItem('crb-lang')}catch(e){}
  if(s==='en'||s==='es')set(s);else pintar();
})();
