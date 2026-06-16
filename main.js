import { applyTranslations } from './js/modules/langues.js';
import { initNavbar }        from './js/modules/navbar.js';
import { initProjects }      from './js/modules/projects.js';
import { initReveal, initTyping, initParticles, initCounters } from './js/modules/animations.js';
import { initContact }       from './js/modules/contact.js';
import { initTheme }         from './js/modules/theme.js';

/* ── Loader ── */
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => loader?.classList.add('hidden'), 800);
});

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', async () => {
  applyTranslations('fr');
  initNavbar();
  initTheme();
  await initProjects('projects-grid');
  initReveal();
  initTyping('hero-typed');
  initParticles('hero-canvas');
  initCounters();
  initContact();

});
