/*
  Generic "on this page" active-link tracker. Works on any page that has a
  single `.toc` element containing `<a href="#some-id">` links — used by
  index.html (right-side TOC), whmcs-onboarding.html and upmind.html
  (left-side TOC). Highlights the link for whichever section is currently
  in view while scrolling, and highlights immediately on click so there's
  no lag waiting for scroll to catch up.
*/
(function () {
  function initTocSpy() {
    var toc = document.querySelector('.toc');
    if (!toc) return;

    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    var targets = links.map(function (a) {
      var id = a.getAttribute('href').slice(1);
      return id ? document.getElementById(id) : null;
    });

    function setActive(link) {
      links.forEach(function (a) { a.classList.remove('on'); });
      if (link) link.classList.add('on');
    }

    links.forEach(function (a) {
      a.addEventListener('click', function () { setActive(a); });
    });

    if (!('IntersectionObserver' in window)) return;

    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var idx = targets.indexOf(entry.target);
        if (idx === -1) return;
        if (entry.isIntersecting) visible[idx] = true; else delete visible[idx];
      });
      var indices = Object.keys(visible).map(Number);
      if (indices.length) {
        setActive(links[Math.min.apply(null, indices)]);
      }
    }, { rootMargin: '-96px 0px -70% 0px', threshold: 0 });

    targets.forEach(function (t) { if (t) observer.observe(t); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTocSpy);
  } else {
    initTocSpy();
  }
})();
