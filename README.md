# EI Consulting — Website

Single-page website for **Environmental & Industrial Consulting**, a technical consulting firm based in Paraguay led by Ing. Leticia Villalba.

## Stack

- **Flask** (Python) — serves the SPA, i18n API, and contact form endpoint
- **Tailwind CSS** (CDN) — utility-first styling with custom brand color config
- **Jinja2** — server-side rendering of translations on initial page load
- **Vanilla JS** — language switching, scroll animations, counter animation, contact form

## Project Structure

```
eiconsulting-web/
├── app.py                  # Flask app — routes, i18n loader, contact handler
├── templates/
│   └── index.html          # Main SPA template (Tailwind + Jinja2)
├── static/
│   ├── css/style.css       # Minimal overrides (animations, navbar states)
│   ├── js/main.js          # Navbar, burger, i18n, reveal, counters, form
│   ├── i18n/
│   │   ├── es.json         # Spanish translations
│   │   └── en.json         # English translations
│   └── img/
│       └── Background.jpg  # Hero background image
└── material-tailwind-course-1.0.0/   # Reference template (read-only)
```

## Features

- **Bilingual (ES/EN)** — language switching via `/api/lang/<lang>` with no page reload
- **Responsive** — mobile-first layout with hamburger menu
- **Scroll animations** — reveal on scroll with staggered delays via `IntersectionObserver`
- **Animated counters** — stats animate in when they enter the viewport
- **Contact form** — POSTs to `/api/contact`, ready for Flask-Mail integration
- **Transparent → white navbar** — transitions on scroll, matching the Material Tailwind pattern

## Sections

1. **Hero** — fullscreen background with overlay, badge, headline, CTA buttons, and 3 stats
2. **Nosotros / About** — Misión, Visión, Valores as white cards
3. **Servicios / Services** — 5 dark service cards + 1 CTA gradient card
4. **Por Qué Nosotros / Why Us** — dark info card + feature list + 3 animated stats
5. **Contacto / Contact** — 2-column layout: contact info card + form
6. **Footer** — 3-column: brand description, navigation links, direct contact

## Setup

```bash
pip install flask
python app.py
```

Visit `http://localhost:5000`

## Contact

**Ing. Leticia Villalba**  
leticiapyconsulting@gmail.com  
+595 981 133 333
