import { applyTranslations }          from '../modules/langues.js';
import { initNavbar }                  from '../modules/navbar.js';
import { initReveal }                  from '../modules/animations.js';
import { initTheme }                   from '../modules/theme.js';
import { initAllProjectsWithFilter }   from '../modules/projects.js';

const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader?.classList.add('hidden'), 800));

document.addEventListener('DOMContentLoaded', async () => {
  applyTranslations('fr');
  initNavbar();
  initTheme();
  await initAllProjectsWithFilter('all-projects-grid');
  initReveal();
});
