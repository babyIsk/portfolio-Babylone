import { t } from './langues.js';

/* ── Scroll reveal ── */
export function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* Re-observe newly rendered cards after filter change */
  new MutationObserver(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }).observe(document.getElementById('projects-grid') ?? document.body, { childList: true, subtree: true });
}

/* ── Typing effect ── */
export function initTyping(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let phrases = [];
  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let timeout;

  function updatePhrases() {
    phrases = t('hero.typed');
    if (!Array.isArray(phrases)) phrases = [phrases];
  }

  function type() {
    updatePhrases();
    const phrase = phrases[phraseIndex % phrases.length];

    if (!deleting) {
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        deleting = true;
        timeout = setTimeout(type, 1800);
        return;
      }
      timeout = setTimeout(type, 75);
    } else {
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex++;
        timeout = setTimeout(type, 400);
        return;
      }
      timeout = setTimeout(type, 38);
    }
  }

  document.addEventListener('langchange', () => {
    clearTimeout(timeout);
    charIndex = 0;
    deleting  = false;
    type();
  });

  type();
}

/* ── Canvas particle background ── */
export function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x         = Math.random() * canvas.width;
      this.y         = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.vx        = (Math.random() - 0.5) * 0.4;
      this.vy        = -(Math.random() * 0.3 + 0.1);
      this.r         = Math.random() * 1.8 + 0.6;
      this.a         = Math.random() * 0.4 + 0.1;
      this.colorSeed = Math.random();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -5 || this.x < -5 || this.x > canvas.width + 5) this.reset();
    }

    draw() {
      const isLight = document.documentElement.classList.contains('light');
      const color = isLight
        ? (this.colorSeed > 0.6 ? '#c04040' : '#7a8c00')
        : (this.colorSeed > 0.6 ? '#e87070' : '#d4e64c');
      const alpha = isLight ? Math.min(this.a * 2.8, 0.85) : this.a;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 60 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  const resizeObserver = new ResizeObserver(() => {
    cancelAnimationFrame(animId);
    resize();
    loop();
  });
  resizeObserver.observe(canvas.parentElement);

  init();
  loop();
}

/* ── Counter animation ── */
export function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw);
      const suffix = raw.replace(String(num), '');
      if (isNaN(num)) return;

      let start = 0;
      const duration = 1200;
      const step = timestamp => {
        if (!step.startTime) step.startTime = timestamp;
        const elapsed = timestamp - step.startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(num * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
