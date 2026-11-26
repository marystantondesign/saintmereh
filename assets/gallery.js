// saintmereh: staggered grid + full-screen swipe viewer, used by Ceramics, Rugs and the "looked at" collections.
// Each page sets window.GALLERY = { items: [{ label, ratio }], caption } before loading this file.
(function () {
  if (window.SM_DESK) return;
  var cfg = window.GALLERY || { items: [] };
  var items = cfg.items.map(function (it, i) {
    return { label: it.label, r: it.ratio, g: 60 + ((i * 37) % 26) };
  });
  var g = document.getElementById('g');
  var v = document.getElementById('v'), sl = document.getElementById('sl'), sg = document.getElementById('sg');
  var ct = document.getElementById('ct'), cp = document.getElementById('cp');
  var cur = 0, skip = false;

  function shade(it) { return 'hsl(35,5%,' + it.g + '%)'; }

  items.forEach(function (it, i) {
    var t = document.createElement('button');
    t.type = 'button';
    t.className = 't';
    t.setAttribute('aria-label', it.label);
    var im = document.createElement('span');
    im.className = 'im';
    im.style.paddingTop = (it.r * 100) + '%';
    im.style.background = shade(it);
    t.appendChild(im);
    var s = document.createElement('small');
    s.textContent = it.label;
    t.appendChild(s);
    t.addEventListener('click', function () { cur = i; v.classList.add('open'); document.body.style.overflow = 'hidden'; show(0); });
    g.appendChild(t);
  });

  function show(dir) {
    var it = items[cur];
    while (sl.firstChild) sl.removeChild(sl.firstChild);
    var sw = sg.clientWidth - 40, sh = sg.clientHeight - 40;
    var w = Math.min(sw, sh / it.r), h = w * it.r;
    var im = document.createElement('div');
    im.className = 'big';
    im.style.width = w + 'px';
    im.style.height = h + 'px';
    im.style.background = shade(it);
    sl.appendChild(im);
    ct.textContent = (cur + 1) + ' / ' + items.length;
    cp.textContent = it.label + ' · ' + (cfg.caption || 'title · year');
    if (dir) {
      sl.style.transition = 'none';
      sl.style.transform = 'translateX(' + (dir * 60) + 'px)';
      sl.style.opacity = '0';
      void sl.offsetWidth;
      sl.style.transition = '';
      sl.style.transform = 'none';
      sl.style.opacity = '1';
    }
  }
  function go(d) { cur = (cur + d + items.length) % items.length; show(d); }
  function close() { v.classList.remove('open'); document.body.style.overflow = ''; }

  document.getElementById('nx').addEventListener('click', function () { if (skip) { skip = false; return; } go(1); });
  document.getElementById('pv').addEventListener('click', function () { if (skip) { skip = false; return; } go(-1); });
  document.getElementById('x').addEventListener('click', close);
  var x0 = null;
  sg.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
  sg.addEventListener('pointerup', function (e) {
    if (x0 === null) return;
    var dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) { skip = true; setTimeout(function () { skip = false; }, 350); go(dx < 0 ? 1 : -1); }
  });
  document.addEventListener('keydown', function (e) {
    if (!v.classList.contains('open')) return;
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'Escape') close();
  });
})();
