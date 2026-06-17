import { getLang, t } from './langues.js';

let allProjects = [];

function badgeClass(cat) {
  return `card-badge card-badge-${cat}`;
}

function badgeLabel(cat) {
  const map = { pro: 'Pro', school: 'Académique', personal: 'Personnel' };
  return map[cat] ?? cat;
}

function getDetailBase() {
  return window.location.pathname.includes('/src/') ? '' : 'src/';
}

function buildCard(project) {
  const lang  = getLang();
  const title = project[`title_${lang}`] ?? project.title_fr;
  const desc  = project[`short_${lang}`] ?? project.short_fr;

  const tags = (project[`card_tags_${lang}`] ?? project.card_tags_fr ?? project.tech.slice(0, 5));
  const tech = tags.map(tag => `<span>${tag}</span>`).join('');

  const detailUrl = `${getDetailBase()}project-detail.html?id=${project.id}`;

  return `
  <article class="project-card reveal" data-category="${project.category}" role="listitem">
    <a href="${detailUrl}" class="card-cover-link" aria-label="Voir les détails : ${title}"></a>
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
    </div>
  </article>`;
}

export async function initProjects(containerId = 'projects-grid') {
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

  const featured = allProjects.filter(p => p.featured);
  renderProjects(container, featured);

  document.addEventListener('langchange', () => renderProjects(container, featured));
}

export async function initAllProjectsWithFilter(containerId = 'all-projects-grid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch('../data/projects.json');
    allProjects = await res.json();
  } catch {
    container.innerHTML = '<p style="color:var(--clr-text-muted);text-align:center">Projets non disponibles.</p>';
    return;
  }

  renderProjects(container, allProjects);
  initFilter(container, allProjects);

  document.addEventListener('langchange', () => {
    renderProjects(container, getCurrentFilteredProjects(allProjects));
  });
}

function renderProjects(container, projects) {
  container.innerHTML = projects.map(buildCard).join('');
  container.querySelectorAll('.project-card').forEach(card => {
    requestAnimationFrame(() => card.classList.add('visible'));
  });
}

function getCurrentFilter() {
  return document.querySelector('.filter-btn.active')?.dataset?.filter ?? 'all';
}

function getCurrentFilteredProjects(projects) {
  const filter = getCurrentFilter();
  return filter === 'all' ? projects : projects.filter(p => p.category === filter);
}

function initFilter(container, projects) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
      renderProjects(container, filtered);
    });
  });
}
