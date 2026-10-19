/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 05/10/2026 · actualizado 18/10/2026 */
(function(){
  var b=document.getElementById('lang');
  function setLang(l){document.querySelectorAll('[data-lang]').forEach(function(d){d.hidden=d.getAttribute('data-lang')!==l});document.documentElement.lang=l;if(b)b.textContent=l==='es'?'EN':'ES';if(b){b.setAttribute('aria-label',l==='es'?'EN · View in English':'ES · Ver en español');b.setAttribute('lang',l==='es'?'en':'es');}try{localStorage.setItem('crb-lang',l)}catch(e){}}
  var s=null;try{s=localStorage.getItem('crb-lang')}catch(e){} if(s==='en'||s==='es')setLang(s);
  if(b)b.addEventListener('click',function(){setLang(document.documentElement.lang==='en'?'es':'en')});
  document.querySelectorAll('.copy-mail').forEach(function(btn){btn.addEventListener('click',function(){var m=btn.querySelector('.mail'),msg=btn.closest('.ct').querySelector('.copy-msg'),ok=btn.getAttribute('data-ok');function sel(){try{var r=document.createRange();r.selectNodeContents(m);var g=getSelection();g.removeAllRanges();g.addRange(r)}catch(e){}}try{navigator.clipboard.writeText(m.textContent).then(function(){msg.textContent=ok},sel)}catch(e){sel()}})});
})();
