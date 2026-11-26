// saintmereh: shared bits for the desktop layouts (900px and wider).
(function () {
  var IG = 'https://www.instagram.com/saintmereh/';
  var LB = 'https://letterboxd.com/'; // TODO: your Letterboxd profile URL (also in site.js)
  window.SMD = { IG: IG, LB: LB };
  Array.prototype.forEach.call(document.querySelectorAll('[data-lb]'), function (a) { a.href = LB; });

  // If the window gets narrow, reload so the phone layout takes over.
  if (window.matchMedia) {
    var mq = matchMedia('(min-width: 900px)');
    var onChange = function () { if (!mq.matches) location.reload(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    // Opened directly at /desktop/... on a phone: send it to the regular page.
    if (!mq.matches && /^\/desktop(\/|$)/.test(location.pathname)) {
      location.replace(location.pathname.replace(/^\/desktop/, '').replace(/\/index$/, '') || '/');
    }
  }
})();
