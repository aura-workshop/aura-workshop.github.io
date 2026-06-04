/* AURA — shared behavior: mobile nav, active-link, header shadow.
   Progressive enhancement only — the site is fully usable without JS. */
(function () {
  'use strict';

  // --- mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var body = document.body;
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close menu when a link is tapped
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // reset on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) {
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- active link (mark the current page in the nav; clean-URL aware) ---
  var norm = function (p) {
    p = p.replace(/index\.html$/, '').replace(/\.html$/, '');   // /cfp.html and /cfp -> /cfp
    if (p.length > 1) p = p.replace(/\/$/, '');                 // drop trailing slash (keep root "/")
    return p || '/';
  };
  var here = norm(location.pathname);
  document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
    if (norm(a.getAttribute('data-page')) === here) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // --- subtle header shadow once scrolled ---
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 8
        ? '0 1px 0 rgba(0,0,0,.04), 0 10px 30px -22px rgba(0,0,0,.5)'
        : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
