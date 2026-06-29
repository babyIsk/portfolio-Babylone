import { initNavbar } from '../modules/navbar.js';
import { initTheme }  from '../modules/theme.js';

const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader?.classList.add('hidden'), 800));

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTheme();
});
