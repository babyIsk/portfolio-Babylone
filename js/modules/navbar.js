import { applyTranslations } from './langues.js';

export function initNavbar() {
  const header     = document.getElementById('header');
  const toggle     = document.getElementById('menu-toggle');
  const menu       = document.getElementById('nav-menu');
  const navLinks   = document.querySelectorAll('.nav-link[href^="#"]');
  const langBtns   = document.querySelectorAll('.lang-btn');

  /* ── Scrolled state ── */
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    highlightActiveSection();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close menu on link click */
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      if (href && !href.startsWith('#')) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });

  /* Close menu on outside click */
  document.addEventListener('click', e => {
    if (!header.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* Close on ESC */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  /* ── aria-current="page" sur le lien actif ── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link:not([href^="#"])').forEach(link => {
    try {
      const linkPath = new URL(link.href, location.origin).pathname;
      if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
        link.setAttribute('aria-current', 'page');
      }
    } catch (_) {}
  });

  /* ── Language switcher ── */
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTranslations(btn.dataset.lang);
    });
  });

  /* ── Active link highlight ── */
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= 100) currentId = section.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + currentId);
    });
  }
}
