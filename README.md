# Babylone ISSHAK — Portfolio

> Portfolio personnel développé en **HTML / CSS / JavaScript vanilla**, sans framework ni dépendance externe.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=flat&logo=github&logoColor=white)](https://pages.github.com/)

---

## Aperçu

Site vitrine présentant mon parcours, mes compétences et mes projets professionnels, académiques et personnels. Il répond aux exigences d'évaluation du module **Master CMW – Université Gustave Eiffel** (rendu : 27/06/2026).

### Fonctionnalités

| Fonctionnalité | Détail |
|---|---|
| - Bilingue FR / EN | Switcher sans rechargement, persistance via `localStorage` |
| - Mode clair / sombre | Toggle sun/moon dans la navbar, thème persisté dans `localStorage`, anti-FOUC |
| - Animations | Canvas particules, typing effect, scroll reveal (IntersectionObserver), compteurs animés |
| - Projets dynamiques | Chargés depuis `data/projects.json` via `fetch()`, filtrables par catégorie |
| - Responsive | Mobile-first, menu hamburger, grilles adaptatives |
| - Accessibilité | HTML sémantique, ARIA, skip-link, `:focus-visible`, `aria-live` |
| - Performance | Google Fonts avec `preconnect`, `loading="lazy"` sur l'iframe vidéo, CSS modulaire |
| - Mentions légales | Page dédiée conforme à la loi LCEN n° 2004-575 et au RGPD |

---

## Stack technique

Ce projet est intentionnellement **sans framework ni bundler** afin de démontrer la maîtrise des standards natifs du web.

```
HTML5        →  Structure sémantique, ARIA
CSS3         →  Custom properties, clamp(), Grid, Flexbox, @import modulaire
JavaScript   →  ES Modules (type="module"), fetch(), Canvas API, IntersectionObserver
```

---

## Design system

Les couleurs, espacements et typographies sont centralisés dans `styles/base/variables.css` sous forme de **CSS custom properties** (`--clr-*`, `--sp-*`, `--text-*`…).

Le mode clair est défini par le sélecteur `html.light` qui surcharge les tokens du thème sombre par défaut — aucun doublon de code CSS.

| Token | Dark | Light |
|---|---|---|
| `--clr-bg` | `#1a1a2e` | `#faf9f7` |
| `--clr-accent` | `#e87070` | `#c04040` |
| `--clr-yellow` | `#d4e64c` | `#6b7a00` |
| `--clr-text` | `#f0f0f8` | `#1a1a2e` |

---

## Lancer le projet en local

Aucune installation requise. Le seul prérequis est un serveur HTTP local (pour que les ES Modules et `fetch()` fonctionnent — ils ne s'exécutent pas via `file://`).

**Option 1 — Extension VS Code**
Installer [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), clic droit sur `index.html` → *Open with Live Server*.

**Option 2 — Python**
```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

**Option 3 — Node.js**
```bash
npx serve .
```

---

## Déploiement

Le site est hébergé sur **GitHub Pages** (branche `main`).

```bash
# Pousser les modifications sur main suffit à déclencher le déploiement
git add .
git commit -m "feat: description du changement"
git push origin main
```

---

## Accessibilité & performances

- **Skip link** pour les utilisateurs clavier/lecteurs d'écran
- Tous les éléments interactifs ont un `aria-label` explicite
- `aria-live="polite"` sur le texte animé (typing effect)
- `aria-expanded` synchronisé sur le menu hamburger
- Typographie fluide via `clamp()` — aucun media query pour les tailles de police
- `scroll-margin-top` sur toutes les sections pour compenser la navbar fixe

---

## Auteure

**Babylone ISSHAK**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/babylone-isshak-05a89a24b/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:babylone.isshak@gmail.com)

---

*Portfolio réalisé dans le cadre du module d'évaluation Master CMW — Juin 2026*
