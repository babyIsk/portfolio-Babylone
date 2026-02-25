import { updateLang } from './langues.js';

const toggleButton = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");

toggleButton.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelector('#btn-fr').addEventListener('click', () => updateLang('french'));
document.querySelector('#btn-en').addEventListener('click', () => updateLang('english'));