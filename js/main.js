/* ============================================================
   Elder Seth Shumway — Mission Website
   main.js: nav, scroll animations, carousel
   ============================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Sticky Nav ───────────────────────────────────────────── */
  const header = document.querySelector('.site-header');

  function updateNav() {
    if (!header) return;
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Hamburger / Mobile Menu ──────────────────────────────── */
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    document.body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    mobileMenu.setAttribute('aria-hidden', 'false');
    // Trap focus inside menu
    mobileMenu.querySelector('a').focus();
  }

  function closeMenu() {
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.focus();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      document.body.classList.contains('nav-open') ? closeMenu() : openMenu();
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        closeMenu();
      }
    });

    // Close on backdrop click
    mobileMenu.addEventListener('click', e => {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  /* ── Scroll Animations (Intersection Observer) ────────────── */
  if (!prefersReducedMotion) {
    const animatedEls = document.querySelectorAll('[data-animate]');

    if (animatedEls.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      animatedEls.forEach(el => observer.observe(el));
    } else {
      // Fallback: make all visible immediately
      animatedEls.forEach(el => el.classList.add('is-visible'));
    }
  } else {
    // Reduced motion: show all immediately
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  /* ── Quote Carousel ──────────────────────────────────────── */
  const slides    = document.querySelectorAll('.quote-slide');
  const dots      = document.querySelectorAll('.dot');
  const prevBtn   = document.querySelector('.carousel-prev');
  const nextBtn   = document.querySelector('.carousel-next');
  const carousel  = document.querySelector('.carousel');

  let current = 0;
  let autoTimer = null;
  const INTERVAL = 5500;

  function goTo(index) {
    const total = slides.length;
    const next = (index + total) % total;

    // Deactivate current
    slides[current].setAttribute('aria-hidden', 'true');
    slides[current].style.position = 'absolute';
    dots[current].classList.remove('dot--active');
    dots[current].setAttribute('aria-selected', 'false');

    // Activate next
    current = next;
    slides[current].setAttribute('aria-hidden', 'false');
    slides[current].style.position = 'relative';
    dots[current].classList.add('dot--active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAuto() {
    if (prefersReducedMotion) return;
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if (slides.length && !prefersReducedMotion) {
    // Initialize first slide position
    slides.forEach((slide, i) => {
      slide.style.position = i === 0 ? 'relative' : 'absolute';
    });

    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
    });

    // Pause on hover / focus
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);
      carousel.addEventListener('focusin', stopAuto);
      carousel.addEventListener('focusout', startAuto);
    }

    // Keyboard nav on carousel
    if (carousel) {
      carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
        if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
      });
    }

    startAuto();
  } else if (slides.length) {
    // Reduced motion: show all slides statically, remove carousel UI
    slides.forEach(slide => {
      slide.setAttribute('aria-hidden', 'false');
      slide.style.position = 'relative';
      slide.style.marginBottom = '2rem';
    });
    const controls = document.querySelector('.carousel-controls');
    if (controls) controls.style.display = 'none';
    const track = document.querySelector('.carousel-track');
    if (track) { track.style.minHeight = 'auto'; track.style.flexDirection = 'column'; }
  }

})();
