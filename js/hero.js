/* © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 18/10/2026
   Hero: globo de puntos con arcos desde CDMX hacia los países con equipos y clientes, y menú móvil.
   Sin librerías. Se pausa fuera de pantalla y con la pestaña oculta; con "reducir movimiento" dibuja un cuadro fijo. */
(function () {
  /* ---------- Menú móvil ---------- */
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  if (burger && menu) {
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
  }

  /* ---------- Globo ---------- */
  var cv = document.getElementById('globo');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d'), hero = cv.parentElement;
  var base = document.createElement('canvas'); base.className = 'globe'; base.setAttribute('aria-hidden', 'true');
  hero.insertBefore(base, cv); var bctx = base.getContext('2d');
  var reduce = false; try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* Máscara de tierra 180×90 (2°), generada de un conjunto público de tierra/agua */
  var MASK = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAfvAAAAAAAAAAAAAAAAAAAAAAAAx37///+AAAAAGoABAAAAAAAAAAAAAIe8P///wAA8AAAAAA0AAAAAAAAAAAwADw////4AAIAAAAAAHAAAAAAAAAAALivwAf//wAAAAADAAP/wAHIAAAAAADsj38AH/+gAAAAAEAH///OAAAAgBgAAfw3/gB/+gAAAgAMHe///+/9gBAP/7/nbdrwD/+AAAH/Ag7H////////8H//////g8H/gAAAf/6//f////////Mf/////9H4D4A+AA+ev///////////AP/////4A0B4AAAD5/////////////Af1////gHgA4AAAP5///////////LwAHgD///gH0AAAAAG4/////////+AMAABAC///4D+AAAAGCx/////////4A4AAAAB////n/gAAAOCR/////////4A4AAAAAf///3/wAAAbH//////////9AgAAAAAP/////gAAADf//////////9AAAAAAAF////0YAAAB///////////8AAAAAAAD////8EAAAB///v///////5AAAAAAAD////+AAAAB/f5f///////wAAAAAAAD////gAAAAfxnwP///////jgAAAAAAD///+AAAAAPCb3///////+AAAAAAAAD///8AAAAAfCJf//////+ECAAAAAAAB///8AAAAAGDRf///////mMAAAAAAAA///8AAAAAH+Ai///////E8AAAAAAAAf//wAAAAAP/AA///////BgAAAAAAAAP//gAAAAAf/73///////gAAAAAAAAAD/AQAAAAAf//9/f/////gAAAAAAAAAF+AQAAAAB///+/n/////AAAAAAAAAAC+AAAAAAB///+fwH///+AAAAAAAAAAAeAwAAAAD////f/D///8gAAAAAAAAAAeGEAAAAD////v+B/j/AAAAAAAAAAAAPMAwAAAD////n+AfB+gAAAAAAAAAAAD8AAAAAD////34AeBfAgAAAAAAAAAAAPAAAAAH////3gAcAfAgAAAAAAAAAAADAAAAAD////6AAcAfgwAAAAAAAAAAABBwAAAD////8wAMATAIAAAAAAAAAAAAr/AAAB/////gAIASAAAAAAAAAAAAAAH/gAAA/////gACAAAIAAAAAAAAAAAAH/8AAAYH///AAAAsGAAAAAAAAAAAAAH/+AAAAB//+AAAAUOAAAAAAAAAAAAAP/+AAAAB//8AAAAc+gAAAAAAAAAAAAP//gAAAD//4AAAAMeBgAAAAAAAAAAAP//8AAAB//wAAAAGdCuAAAAAAAAAAAf///AAAA//wAAAACAAHgAAAAAAAAAAP///gAAA//wAAAAB4AHggAAAAAAAAAH///AAAAf/wAAAAACIDQIAAAAAAAAAH//+AAAAf/wAAAAAAAAAAAAAAAAAAAD//+AAAA//wgAAAAABxAAAAAAAAAAAD//8AAAA//wgAAAAAHxgBAAAAAAAAAA//8AAAA//zgAAAAAf/gAAAAAAAAAAAf/8AAAA//DgAAAAAf/gAAAAAAAAAAAf/8AAAAf/DAAAAAD//4CAAAAAAAAAAf/wAAAAf/DAAAAAH//4AAAAAAAAAAAf/AAAAAf+DAAAAAH//8AAAAAAAAAAAf/AAAAAP8AAAAAAH//+AAAAAAAAAAA/+AAAAAP8AAAAAAH//+AAAAAAAAAAA/8AAAAAH4AAAAAAD//+AAAAAAAAAAA/8AAAAAHwAAAAAADwf8AAAAAAAAAAA/gAAAAAAAAAAAAACAP4AAAAAAAAAAB/wAAAAAAAAAAAAAAAD4AEAAAAAAAAB+AAAAAAAAAAAAAAAAAAAGAAAAAAAAB6AAAAAAAAAAAAAAAAAwAMAAAAAAAAA8AAAAAAAAAAAAAAAAAQAYAAAAAAAAB4AAAAAAAAAAAAAAAAAAAwAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAACAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAA8AAf/8d/AAAAAAAAAAAAkAAAAAAACP/+H//////AAAAAAAAAAA+AAAAIf////+////////AAAAAAAOMKPAAAB///////////////gAAAH/8D//8AAAH//////////////4AAAF/////8AAAP///////////////4AAIf/////gwBwf///////////////4AAAH//////AAD////////////////wAAA///////+f//////////////////A/wH///////////////////////////////////////////////////////////////////////////////////////';
  var bin = atob(MASK), bits = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) bits[i] = bin.charCodeAt(i);
  function isLand(lat, lon) {
    var r = Math.round((89 - lat) / 2), c = Math.round((lon + 179) / 2);
    if (r < 0) r = 0; if (r > 89) r = 89; if (c < 0) c = 0; if (c > 179) c = 179;
    var k = r * 180 + c; return (bits[k >> 3] >> (7 - (k & 7))) & 1;
  }
  var D = Math.PI / 180;
  function vec(lat, lon) { return [Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D), Math.cos(lat * D) * Math.cos(lon * D)]; }

  /* Puntos repartidos de forma uniforme (espiral de Fibonacci) */
  var land = [], sea = [], N = 9000, GA = Math.PI * (3 - Math.sqrt(5));
  for (var n = 0; n < N; n++) {
    var y = 1 - (n + 0.5) * 2 / N, rr = Math.sqrt(1 - y * y), th = n * GA;
    var lat = Math.asin(y) / D, lon = Math.atan2(Math.sin(th) * rr, Math.cos(th) * rr) / D;
    if (lat < -62) continue;
    if (isLand(lat, lon)) land.push(vec(lat, lon)); else if (n % 5 === 0) sea.push(vec(lat, lon));
  }

  /* Ciudades: CDMX y los países con equipos y clientes */
  var HOME = vec(19.43, -99.13);
  var CITIES = [vec(-34.60, -58.38), vec(-33.45, -70.67), vec(4.71, -74.07), vec(-0.18, -78.47), vec(40.42, -3.70)];
  function slerp(a, b, t) {
    var dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2], om = Math.acos(Math.max(-1, Math.min(1, dot))), s = Math.sin(om);
    var p = Math.sin((1 - t) * om) / s, q = Math.sin(t * om) / s;
    return [a[0] * p + b[0] * q, a[1] * p + b[1] * q, a[2] * p + b[2] * q, om];
  }
  var ARCS = CITIES.map(function (c) {
    var pts = [], S = 56;
    for (var j = 0; j <= S; j++) {
      var t = j / S, v = slerp(HOME, c, t), lift = 1 + Math.sin(Math.PI * t) * (0.06 + v[3] * 0.16);
      pts.push([v[0] * lift, v[1] * lift, v[2] * lift]);
    }
    return pts;
  });

  /* Estrellas con semilla fija: siempre el mismo cielo */
  var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  var STARS = []; for (var s = 0; s < 150; s++) STARS.push([rnd(), rnd(), 0.3 + rnd() * 0.9, 0.15 + rnd() * 0.45]);

  var LC = -55, PC = 8; /* LC se ajusta en size() según el ancho */
  var STEP = 48, W = 0, H = 0, DPR = 1, R = 0, CX = 0, CY = 0, sky = null, WIDE = false, FADE = 1, baseT = -1e9;
  function size() {
    var b = hero.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, b.width < 720 ? 1.25 : 1.5);
    STEP = b.width < 720 ? 66 : 48;
    W = Math.max(1, Math.round(b.width)); H = Math.max(1, Math.round(b.height));
    cv.width = W * DPR; cv.height = H * DPR;
    WIDE = W > 1000;
    if (WIDE) { R = Math.min(H * 0.39, W * 0.25); CX = W * 0.745; CY = H * 0.5; LC = -50; FADE = 1; }
    else if (W < 720) { R = Math.min(W * 0.66, H * 0.4); CX = W * 0.5; CY = H - R * 0.42; LC = -68; FADE = 0.85; }
    else { R = Math.min(W * 0.5, H * 0.36); CX = W * 0.5; CY = H - R * 0.5; LC = -60; FADE = 0.9; }
    base.width = cv.width; base.height = cv.height; baseT = -1e9;
    sky = document.createElement('canvas'); sky.width = cv.width; sky.height = cv.height;
    var g = sky.getContext('2d');
    STARS.forEach(function (st) {
      g.globalAlpha = st[3]; g.fillStyle = '#e6e3ff';
      g.beginPath(); g.arc(st[0] * cv.width, st[1] * cv.height, st[2] * DPR, 0, 7); g.fill();
    });
  }

  function draw(time) {
    var lc = (LC + Math.sin(time / 48000 * 2 * Math.PI) * 13) * D, pc = PC * D;
    var cl = Math.cos(lc), sl = Math.sin(lc), cp = Math.cos(pc), sp = Math.sin(pc);
    function proj(v) {
      var x = v[0] * cl - v[2] * sl, z1 = v[0] * sl + v[2] * cl;
      var y = v[1] * cp - z1 * sp, z = v[1] * sp + z1 * cp;
      return [CX + x * R, CY - y * R, z];
    }
    if (time - baseT >= 200 || time < baseT) {
      baseT = time; var X = bctx;
      X.setTransform(DPR, 0, 0, DPR, 0, 0);
      X.clearRect(0, 0, W, H);
      X.globalAlpha = 1; X.drawImage(sky, 0, 0, W, H);

      /* Halo del borde */
      var halo = X.createRadialGradient(CX, CY, R * 0.9, CX, CY, R * 1.32);
      halo.addColorStop(0, 'rgba(106,13,173,0.30)'); halo.addColorStop(0.45, 'rgba(0,119,181,0.10)'); halo.addColorStop(1, 'rgba(20,10,46,0)');
      X.fillStyle = halo; X.beginPath(); X.arc(CX, CY, R * 1.32, 0, 7); X.fill();
      var body = X.createRadialGradient(CX - R * 0.3, CY - R * 0.35, R * 0.1, CX, CY, R);
      body.addColorStop(0, 'rgba(29,20,80,0.55)'); body.addColorStop(1, 'rgba(11,42,74,0.25)');
      X.fillStyle = body; X.beginPath(); X.arc(CX, CY, R, 0, 7); X.fill();

      /* Océano: retícula tenue, un solo relleno */
      X.fillStyle = '#5fb8ff'; X.globalAlpha = 0.1 * FADE; X.beginPath();
      for (var a = 0; a < sea.length; a++) { var p = proj(sea[a]); if (p[2] > 0.1) X.rect(p[0], p[1], 1, 1); }
      X.fill();
      /* Tierra: puntos agrupados por color y opacidad; un relleno por grupo (barato en celulares) */
      var COLORS = ['#c9a2ff', '#a9a8ff', '#7fbfff'], LV = 5, groups = [];
      for (var g = 0; g < COLORS.length * LV; g++) groups.push([]);
      var sz = Math.max(1, R / 300);  /* mismo diámetro que los puntos originales: 1.4 a 2.9 px */
      for (var b = 0; b < land.length; b++) {
        var q = proj(land[b]); if (q[2] <= 0.02) continue;
        var k = (q[0] - (CX - R)) / (2 * R), ci = k < 0.55 ? 0 : (k < 0.75 ? 1 : 2);
        var li = Math.min(LV - 1, Math.floor(q[2] * LV));
        groups[ci * LV + li].push(q[0], q[1], (1.4 + q[2] * 1.5) * sz);
      }
      for (var gi = 0; gi < groups.length; gi++) {
        var arr = groups[gi]; if (!arr.length) continue;
        X.fillStyle = COLORS[(gi / LV) | 0];
        X.globalAlpha = (0.16 + ((gi % LV) + 0.5) / LV * 0.62) * FADE;
        X.beginPath();
        for (var e = 0; e < arr.length; e += 3) { var s2 = arr[e + 2]; X.rect(arr[e] - s2 / 2, arr[e + 1] - s2 / 2, s2, s2); }
        X.fill();
      }
    }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);

    /* Arcos y pulsos */
    ctx.lineCap = 'round';
    for (var c = 0; c < ARCS.length; c++) {
      var pts = ARCS[c].map(proj);
      ctx.strokeStyle = '#7fd8cf'; ctx.lineWidth = 1.1; ctx.globalAlpha = 0.38;
      ctx.beginPath(); var on = false;
      for (var m = 0; m < pts.length; m++) {
        var v = pts[m]; if (v[2] < -0.02) { on = false; continue; }
        if (!on) { ctx.moveTo(v[0], v[1]); on = true; } else ctx.lineTo(v[0], v[1]);
      }
      ctx.stroke();
      if (!reduce) {
        var ph = ((time / 3600) + c * 0.21) % 1.35, i0 = Math.floor(ph * pts.length), i1 = Math.min(pts.length - 1, i0 + 9);
        if (i0 < pts.length - 1) {
          ctx.lineWidth = 2; ctx.globalAlpha = 0.95; ctx.strokeStyle = '#bff3ec';
          ctx.beginPath(); var on2 = false;
          for (var u = i0; u <= i1; u++) { var w = pts[u]; if (w[2] < -0.02) { on2 = false; continue; } if (!on2) { ctx.moveTo(w[0], w[1]); on2 = true; } else ctx.lineTo(w[0], w[1]); }
          ctx.stroke();
        }
      }
      var end = pts[pts.length - 1];
      if (end[2] > 0) { ctx.globalAlpha = 0.9; ctx.fillStyle = '#7fd8cf'; ctx.beginPath(); ctx.arc(end[0], end[1], 2.4, 0, 7); ctx.fill(); }
    }
    /* CDMX */
    var h0 = proj(HOME);
    if (h0[2] > 0) {
      var pulse = reduce ? 0.5 : (time / 2400) % 1;
      ctx.globalAlpha = 0.5 * (1 - pulse); ctx.strokeStyle = '#f0b429'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(h0[0], h0[1], 4 + pulse * 14, 0, 7); ctx.stroke();
      ctx.globalAlpha = 1; ctx.fillStyle = '#f0b429'; ctx.beginPath(); ctx.arc(h0[0], h0[1], 3.4, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  var running = false, visible = true, last = 0, raf = 0, t0 = performance.now();
  function frame(now) {
    raf = 0;
    if (!running) return;
    if (now - last >= STEP) { last = now; draw(now - t0); }
    raf = requestAnimationFrame(frame);
  }
  function update() {
    var should = ready && !reduce && visible && !document.hidden;
    if (should && !running) { running = true; raf = requestAnimationFrame(frame); }
    if (!should) { running = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  }
  size(); draw(0);
  var ready = false;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; update(); }).observe(hero);
  document.addEventListener('visibilitychange', update);
  var rt = 0; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); draw(performance.now() - t0); }, 120); });
  var go = function () { ready = true; update(); };
  if (document.readyState === 'complete') setTimeout(go, 600); else window.addEventListener('load', function () { setTimeout(go, 600); });
})();
