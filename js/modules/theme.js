export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const updateLabel = () => {
    const isLight = document.documentElement.classList.contains('light');
    toggle.setAttribute('aria-label', isLight ? 'Passer en mode sombre' : 'Passer en mode clair');
  };

  updateLabel();

  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateLabel();
  });
}
