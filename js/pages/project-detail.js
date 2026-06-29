import { applyTranslations, getLang } from '../modules/langues.js';
import { initNavbar } from '../modules/navbar.js';
import { initTheme }  from '../modules/theme.js';

const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader?.classList.add('hidden'), 800));

const badgeLabels = {
  pro:      { fr: 'Professionnel', en: 'Professional' },
  school:   { fr: 'Académique',    en: 'Academic' },
  personal: { fr: 'Personnel',     en: 'Personal' },
};

function render(project, lang) {
  const title    = project[`title_${lang}`]    ?? project.title_fr;
  const short    = project[`short_${lang}`]    ?? project.short_fr;
  const context  = project[`context_${lang}`]  ?? project.context_fr;
  const missions = project[`missions_${lang}`] ?? project.missions_fr ?? [];
  const result   = project[`result_${lang}`]   ?? project.result_fr;
  const type     = project[`type_${lang}`]     ?? project.type_fr;

  document.title = `${title} — Babylone ISSHAK`;

  document.getElementById('detail-badge').textContent   = badgeLabels[project.category]?.[lang] ?? project.category;
  document.getElementById('detail-title').textContent   = title;
  document.getElementById('detail-short').textContent   = short;
  document.getElementById('detail-period').textContent  = project.period;
  document.getElementById('detail-type').textContent    = type;
  document.getElementById('detail-context').textContent = context ?? '';
  document.getElementById('detail-result').textContent  = result ?? '';
  document.getElementById('detail-role').textContent    = project[`role_${lang}`] ?? project.role_fr ?? type;
  document.getElementById('detail-year').textContent    = project.period;

  const visual = document.getElementById('detail-visual');
  if (project.youtube) {
    visual.style.cssText = 'background:none;color:inherit;opacity:1;';
    visual.innerHTML = `<iframe src="https://www.youtube.com/embed/${project.youtube}?rel=0" title="Aperçu – ${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:0;"></iframe>`;
  } else if (project.video) {
    visual.style.cssText = 'background:none;color:inherit;opacity:1;';
    visual.innerHTML = `<video style="width:100%;height:100%;object-fit:cover;" autoplay loop muted playsinline controls aria-label="Aperçu vidéo – ${title}">
      <source src="../public/${project.video}" type="video/mp4" />
    </video>`;
  } else if (project.thumbnail) {
    visual.style.cssText = 'background:none;color:inherit;opacity:1;';
    visual.innerHTML = `<img src="../public/${project.thumbnail}" alt="${title}" style="width:100%;height:100%;object-fit:cover;object-position:center top;" />`;
  } else {
    visual.innerHTML = '';
    visual.style.cssText = '';
    visual.textContent = title.slice(0, 2).toUpperCase();
    visual.style.background = `linear-gradient(135deg, ${project.color}22, ${project.color}44)`;
    visual.style.color = project.color;
  }

  const missionsEl = document.getElementById('detail-missions');
  missionsEl.innerHTML = missions.map(m => `<li>${m}</li>`).join('');

  const techEl = document.getElementById('detail-tech');
  const highlighted = ['React', 'Next.js', 'TypeScript', 'Angular', 'Figma', 'GitHub'];
  techEl.innerHTML = project.tech.map(tag => {
    const cls = highlighted.includes(tag) ? 'sidebar-tag' : 'sidebar-tag neutral';
    return `<span class="${cls}">${tag}</span>`;
  }).join('');

  const ctaEl = document.getElementById('detail-cta');
  if (ctaEl) {
    if (project.cta?.type === 'visit') {
      const label = lang === 'fr' ? 'Visiter le site' : 'Visit the site';
      ctaEl.innerHTML = `<a href="${project.cta.url}" class="btn-cta btn-cta-visit" target="_blank" rel="noopener noreferrer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        ${label}
      </a>`;
    } else if (project.cta?.type === 'download') {
      const label = lang === 'fr' ? 'Télécharger le rapport' : 'Download the report';
      ctaEl.innerHTML = `<a href="${project.cta.url}" class="btn-cta btn-cta-download" download>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        ${label}
      </a>`;
    } else {
      ctaEl.innerHTML = '';
    }
  }

  const demoWrap      = document.getElementById('detail-demo');
  const demoContainer = document.getElementById('detail-demo-container');
  if (project.youtube) {
    demoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${project.youtube}?rel=0" title="Démonstration – ${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:0;"></iframe>`;
    demoWrap.style.display = 'block';
  } else if (project.demo_video) {
    demoContainer.innerHTML = `<video controls preload="metadata" style="width:100%;height:100%;" aria-label="Démonstration – ${title}"><source src="../public/${project.demo_video}" type="video/mp4" /></video>`;
    demoWrap.style.display = 'block';
  } else {
    demoWrap.style.display = 'none';
  }

  const linksBlock = document.getElementById('detail-links-block');
  if (project.github || project.demo) {
    linksBlock.style.display = 'flex';
    linksBlock.style.flexDirection = 'column';
    linksBlock.style.gap = 'var(--sp-2)';
    const links = [];
    if (project.github) links.push(`<a href="${project.github}" class="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">Code source</a>`);
    if (project.demo)   links.push(`<a href="${project.demo}"   class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Voir la démo</a>`);
    linksBlock.innerHTML = `<div class="sidebar-divider"></div>${links.join('')}`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  applyTranslations('fr');
  initNavbar();
  initTheme();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.getElementById('detail-title').textContent = 'Projet introuvable';
    return;
  }

  let projects;
  try {
    const res = await fetch('../data/projects.json');
    projects = await res.json();
  } catch {
    document.getElementById('detail-title').textContent = 'Données non disponibles';
    return;
  }

  const project = projects.find(p => p.id === id);
  if (!project) {
    document.getElementById('detail-title').textContent = 'Projet introuvable';
    return;
  }

  render(project, getLang());

  document.addEventListener('langchange', ({ detail }) => render(project, detail.lang));
});
