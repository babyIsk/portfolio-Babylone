import { getLang, t } from './langues.js';

let allProjects = [];

const categoryLabels = { pro: 'pro', school: 'school', personal: 'personal' };

function badgeClass(cat) {
  return `card-badge card-badge-${cat}`;
}

function badgeLabel(cat) {
  const map = { pro: 'Pro', school: 'Académique', personal: 'Personnel' };
  return map[cat] ?? cat;
}

function techColors() {
  return null;
}

function buildCard(project) {
  const lang = getLang();
  const title = project[`title_${lang}`] ?? project.title_fr;
  const desc  = project[`short_${lang}`] ?? project.short_fr;
  const type  = project[`type_${lang}`]  ?? project.type_fr;

  const tech = project.tech.slice(0, 5).map(tag => {
    const color = techColors(tag);
    const style = color ? `style="color:${color};border-color:${color}33"` : '';
    return `<span ${style}>${tag}</span>`;
  }).join('');

  const links = [];
  if (project.github) {
    links.push(`<a href="${project.github}" class="card-link" target="_blank" rel="noopener noreferrer" aria-label="Code source de ${title}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.645.35-1.085.636-1.335-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.293 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
      Code
    </a>`);
  }
  if (project.demo) {
    links.push(`<a href="${project.demo}" class="card-link" target="_blank" rel="noopener noreferrer" aria-label="Démo de ${title}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
      Démo
    </a>`);
  }

  return `
  <article class="project-card reveal" data-category="${project.category}" role="listitem">
    <div class="card-thumb">
      <div class="card-thumb-bg" style="color:${project.color}">${title.slice(0, 2).toUpperCase()}</div>
      <div class="card-thumb-overlay" style="background:linear-gradient(135deg,${project.color}22,${project.color}44)"></div>
      <span class="${badgeClass(project.category)}">${badgeLabel(project.category)}</span>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span class="card-company">${project.company}</span>
        <span class="card-period">${project.period}</span>
      </div>
      <h3 class="card-title">${title}</h3>
      <p class="card-desc">${desc}</p>
      <div class="card-tech">${tech}</div>
      ${links.length ? `<div class="card-links">${links.join('')}</div>` : ''}
    </div>
  </article>`;
}

export async function initProjects(containerId = 'projects-grid', filter = 'all') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (allProjects.length === 0) {
    try {
      const res = await fetch('./data/projects.json');
      allProjects = await res.json();
    } catch {
      container.innerHTML = '<p style="color:var(--clr-text-muted);text-align:center">Projets non disponibles.</p>';
      return;
    }
  }

  const featured = containerId === 'projects-grid';
  const source   = featured ? allProjects.filter(p => p.featured) : allProjects;

  renderProjects(container, source, filter);
  initFilter(container, source);

  document.addEventListener('langchange', () => {
    renderProjects(container, source, getCurrentFilter());
  });
}

function renderProjects(container, projects, filter) {
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  container.innerHTML = filtered.map(buildCard).join('');
  container.querySelectorAll('.project-card').forEach(card => {
    requestAnimationFrame(() => card.classList.add('visible'));
  });
}

function getCurrentFilter() {
  return document.querySelector('.filter-btn.active')?.dataset?.filter ?? 'all';
}

function initFilter(container, projects) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(container, projects, btn.dataset.filter);
    });
  });
}

/* Used by projects.html for full listing */
export async function initAllProjects() {
  const res = await fetch('./data/projects.json');
  allProjects = await res.json();
  return allProjects;
}
