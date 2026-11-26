// saintmereh: shared behavior (menu, footer links, toast).
(function () {
  // On wide screens the desktop layout replaces this page (see the script in each page's head).
  if (window.SM_DESK) return;
  if (window.matchMedia) {
    var mq = matchMedia('(min-width: 900px)');
    var onChange = function () { if (mq.matches) location.reload(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }
  var IG = 'https://www.instagram.com/saintmereh/';
  var LB = 'https://letterboxd.com/'; // TODO: your Letterboxd profile URL
  window.SM = { IG: IG, LB: LB };

  // Menu overlay
  var ov = document.createElement('div');
  ov.className = 'sm-menu';
  ov.hidden = true;
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-label', 'Menu');
  ov.innerHTML =
    "<div class='sm-top'><a class='sm-mark' href='/'>saintmereh</a><button type='button' class='sm-x' aria-label='Close menu'>✕</button></div>" +
    "<nav><a href='/'>Home</a><a href='/about'>About</a><a href='/creations'>Creations</a><a href='/collections'>Collections</a><a href='/considerations'>Considerations</a></nav>" +
    "<div class='sm-ext'><a href='" + IG + "' target='_blank' rel='noopener'>Instagram ↗</a><a href='" + LB + "' target='_blank' rel='noopener'>Letterboxd ↗</a></div>";
  document.body.appendChild(ov);
  var path = location.pathname.replace(/\/$/, '') || '/';
  Array.prototype.forEach.call(ov.querySelectorAll('nav a'), function (a) {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
  });
  function closeMenu() { ov.hidden = true; document.body.style.overflow = ''; }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-menu]')) { ov.hidden = false; document.body.style.overflow = 'hidden'; }
    else if (e.target.closest('.sm-x')) closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !ov.hidden) closeMenu(); });

  // Footer social links
  Array.prototype.forEach.call(document.querySelectorAll('[data-ig]'), function (a) { a.href = IG; });
  Array.prototype.forEach.call(document.querySelectorAll('[data-lb]'), function (a) { a.href = LB; });

  // Toast for links that aren't wired up yet
  var ts = document.createElement('div');
  ts.className = 'sm-toast';
  document.body.appendChild(ts);
  var tt;
  window.SM.toast = function (m) {
    ts.textContent = m;
    ts.classList.add('on');
    clearTimeout(tt);
    tt = setTimeout(function () { ts.classList.remove('on'); }, 1800);
  };
})();
