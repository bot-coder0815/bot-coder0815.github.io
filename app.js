/* ============================================================
   Portfolio-App – rendert Inhalte aus data.js & verwaltet Sprache
   ============================================================ */
'use strict';

/* ---------- Sprach-Zustand ---------- */
let currentLang = SITE_CONFIG.defaultLanguage || 'de';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* Kurz-Helfer: nimmt einen zweisprachigen Wert {de, en} und liefert den aktuellen */
const tr = (value) => (value && typeof value === 'object') ? (value[currentLang] ?? value.en ?? value.de ?? '') : value;

/* ---------- Sichtbarkeit der Sektionen ---------- */
function applySectionVisibility() {
  $$('.section').forEach((sec) => {
    const key = sec.id;
    const enabled = SECTIONS[key] ? SECTIONS[key].enabled !== false : true;
    if (!enabled) sec.remove();
    else sec.removeAttribute('data-hidden');
  });
}

/* ---------- Navigation & Sprachumschalter ---------- */
function renderNav(t) {
  const links = [
    { id: 'about', label: t.nav.about, show: SECTIONS.about?.enabled },
    { id: 'skills', label: t.nav.skills, show: SECTIONS.skills?.enabled },
    { id: 'work', label: t.nav.work, show: SECTIONS.work?.enabled },
    { id: 'career', label: t.nav.career, show: SECTIONS.career?.enabled },
    { id: 'minecraft', label: t.nav.minecraft, show: SECTIONS.minecraft?.enabled },
    { id: 'license', label: t.nav.license, show: SECTIONS.license?.enabled },
  ];
  const navLinks = $('#navLinks');
  navLinks.innerHTML = '';
  links.forEach((l) => {
    if (l.show === false) return;
    const a = document.createElement('a');
    a.href = '#' + l.id;
    a.textContent = l.label;
    navLinks.appendChild(a);
  });
  if (SECTIONS.contact?.enabled !== false) {
    const cta = document.createElement('a');
    cta.href = '#contact';
    cta.className = 'nav__cta';
    cta.textContent = t.nav.contact;
    navLinks.appendChild(cta);
  }
}

function renderLangSwitch() {
  const wrap = $('#langSwitch');
  wrap.innerHTML = '';
  SITE_CONFIG.languages.forEach((code) => {
    const btn = document.createElement('button');
    btn.className = 'lang__btn' + (code === currentLang ? ' is-active' : '');
    btn.textContent = code.toUpperCase();
    btn.setAttribute('aria-pressed', code === currentLang);
    btn.addEventListener('click', () => setLanguage(code));
    wrap.appendChild(btn);
  });
}

function setLanguage(code) {
  currentLang = code;
  document.documentElement.lang = code;
  try { localStorage.setItem('portfolio-lang', code); } catch (e) {}
  renderLangSwitch();
  renderAll();
  closeMobileMenu();
}

/* ---------- Sektions-Renderer ---------- */

function renderHero() {
  const t = TRANSLATIONS[currentLang];
  const root = $('#hero');
  root.innerHTML = `
    <p class="hero__hello">${tr(PROFILE.hello) || t.hero.hello}</p>
    <h1 class="hero__name">${protectedHtml(PROFILE.name)}</h1>
    <p class="hero__role">${protectedHtml(tr(PROFILE.role))}</p>
    <p class="hero__tagline">${protectedHtml(tr(PROFILE.tagline))}</p>
    <div class="hero__actions">
      ${SECTIONS.work?.enabled !== false ? `<a href="#work" class="btn btn--primary">${t.buttons.projects}</a>` : ''}
      ${SECTIONS.contact?.enabled !== false ? `<a href="#contact" class="btn btn--ghost">${t.buttons.contact}</a>` : ''}
      <a class="hero__down" href="#about" aria-label="${t.a11y.scroll}">
        <span class="hero__down-arrow">${ICONS.down}</span>
        <span class="hero__down-text">${t.hero.scroll}</span>
      </a>
    </div>
  `;
}

function renderAbout() {
  const t = TRANSLATIONS[currentLang];
  const root = $('#about');
  root.innerHTML = `
    <div class="container">
      <h2 class="section__title">${t.sectionTitles.about}</h2>
      <div class="about__grid">
        <div class="about__text">
          <p>${protectedHtml(tr(ABOUT.intro))}</p>
          <p>${protectedHtml(tr(ABOUT.body))}</p>
        </div>
        <div class="about__stats">
          ${PROFILE.stats.map((s) => `
            <div class="stat">
              <span class="stat__num">${protectedHtml(s.value)}</span>
              <span class="stat__label">${protectedHtml(tr(s.label))}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderSkills() {
  const t = TRANSLATIONS[currentLang];
  const root = $('#skills');
  root.innerHTML = `
    <div class="container">
      <h2 class="section__title">${t.sectionTitles.skills}</h2>
      <div class="skills__grid">
        ${SKILLS.map((g) => `
          <div class="skill-card">
            <h3>${protectedHtml(tr(g.title))}</h3>
            <ul>${g.items.map((i) => `<li>${protectedHtml(tr(i))}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
    </div>
  `;
}

function renderWork() {
  const t = TRANSLATIONS[currentLang];
  const root = $('#work');
  root.innerHTML = `
    <div class="container">
      <h2 class="section__title">${t.sectionTitles.work}</h2>
      <div class="projects__grid">
        ${PROJECTS.map((p) => `
          <article class="project-card">
            <div class="project-card__thumb" style="--c:${p.color || '#2563eb'};">
              ${p.image && p.image !== 'none' ? `<img src="${p.image}" alt="${protectedHtml(tr(p.title))}" />` : ''}
            </div>
            <div class="project-card__body">
              <h3>${protectedHtml(tr(p.title))}</h3>
              <p>${protectedHtml(tr(p.desc))}</p>
              ${(p.tags && p.tags.length) ? `<div class="project-card__tags">${p.tags.map((tag) => `<span>${protectedHtml(tag)}</span>`).join('')}</div>` : ''}
            </div>
          </article>`).join('')}
      </div>
    </div>
  `;
}

function renderCareer() {
  const t = TRANSLATIONS[currentLang];
  const root = $('#career');
  root.innerHTML = `
    <div class="container">
      <h2 class="section__title">${t.sectionTitles.career}</h2>
      <div class="timeline">
        ${CAREER.map((item) => `
          <div class="timeline__item">
            <span class="timeline__dot"></span>
            <div class="timeline__content">
              <h3>${protectedHtml(tr(item.role))}</h3>
              <span class="timeline__meta">${protectedHtml(tr(item.place))} · ${protectedHtml(tr(item.period))}</span>
              <p>${protectedHtml(tr(item.desc))}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;
}

function renderMinecraft() {
  const t = TRANSLATIONS[currentLang];
  const root = $('#minecraft');
  const lead = (t.sectionLeads && t.sectionLeads.minecraft) || '';
  root.innerHTML = `
    <div class="container">
      <h2 class="section__title">${t.sectionTitles.minecraft}</h2>
      ${lead ? `<p class="section__lead">${protectedHtml(lead)}</p>` : ''}
      <div class="mc__grid">
        ${MINECRAFT.map((m) => `
          <article class="mc-card">
            <div class="mc-card__icon" style="--c:${m.color || '#2563eb'};">${m.icon || '✦'}</div>
            <h3>${protectedHtml(tr(m.name))}</h3>
            <p>${protectedHtml(tr(m.desc))}</p>
            ${m.link ? `<a class="link" href="${m.link.url || '#'}" target="${m.link.url && m.link.url.startsWith('http') ? '_blank' : '_self'}">${protectedHtml(tr(m.link.label))}</a>` : ''}
          </article>`).join('')}
      </div>
    </div>
  `;
}

/* Clean SVG-Icons für die Lizenz-Boxen (kein Emoji) */
const ICONS = {
  check: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 5-5"/></svg>',
  cross: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
};

function renderLicense() {
  const t = TRANSLATIONS[currentLang];
  const root = $('#license');
  root.innerHTML = `
    <div class="container">
      <h2 class="section__title">${t.sectionTitles.license}</h2>
      <p class="section__lead">${protectedHtml(tr(LICENSE.intro))}</p>
      <div class="license__grid">
        ${LICENSE.rules.map((r) => `
          <div class="license-card license-card--${r.status}${r.wide ? ' license-card--wide' : ''}">
            <div class="license-card__head">
              <span class="license-card__icon license-card__icon--${r.status}">${ICONS[r.icon] || ''}</span>
              <h3>${protectedHtml(tr(r.title))}</h3>
            </div>
            <p>${protectedHtml(tr(r.desc))}</p>
          </div>`).join('')}
      </div>
    </div>
  `;
}

function renderContact() {
  const t = TRANSLATIONS[currentLang];
  const root = $('#contact');
  const socials = (CONTACT.socials || []).filter((s) => s.enabled !== false);
  root.innerHTML = `
    <div class="container contact__inner">
      <h2 class="section__title">${t.sectionTitles.contact}</h2>
      ${t.sectionLeads?.contact ? `<p class="section__lead">${protectedHtml(t.sectionLeads.contact)}</p>` : ''}
      <div class="contact__row">
        <a href="mailto:${protectedHtml(CONTACT.email || '')}" class="btn btn--primary">${t.buttons.email}</a>
        ${socials.map((s) => `<a href="${s.url || '#'}" class="btn btn--ghost" target="${s.url && s.url.startsWith('http') ? '_blank' : '_self'}">${protectedHtml(s.label)}</a>`).join('')}
      </div>
    </div>
  `;
}

/* ---------- Footer & Einstellungen ---------- */
function renderFooter() {
  const t = TRANSLATIONS[currentLang];
  $('#footerLogo').textContent = PROFILE.logo || PROFILE.name;
  $('#footerLine').textContent = (t.footer.line || '')
    .replace('{year}', String(new Date().getFullYear()))
    .replace('{name}', PROFILE.name);
}

function renderTitle() {
  document.title = PROFILE.name + ' · Portfolio';
}

/* ---------- Sicherheit: Inhalt entschärfen ---------- */
function protectedHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ---------- Alles rendern ---------- */
function renderAll() {
  $('#logo').textContent = PROFILE.logo || PROFILE.name;
  const t = TRANSLATIONS[currentLang];
  renderNav(t);
  applySectionVisibility();
  renderHero();
  if (SECTIONS.about?.enabled !== false && $('#about')) renderAbout();
  if (SECTIONS.skills?.enabled !== false && $('#skills')) renderSkills();
  if (SECTIONS.work?.enabled !== false && $('#work')) renderWork();
  if (SECTIONS.career?.enabled !== false && $('#career')) renderCareer();
  if (SECTIONS.minecraft?.enabled !== false && $('#minecraft')) renderMinecraft();
  if (SECTIONS.license?.enabled !== false && $('#license')) renderLicense();
  if (SECTIONS.contact?.enabled !== false && $('#contact')) renderContact();
  renderFooter();
  renderTitle();
  updateNavOnScroll();
}

/* ---------- Mobile-Menü & Scroll-Effekte ---------- */
function setupMobileMenu() {
  const toggle = $('#navToggle');
  const navLinks = $('#navLinks');
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-label', navLinks.classList.contains('open')
      ? TRANSLATIONS[currentLang].a11y.menu
      : 'Menü schließen');
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMobileMenu();
  });
}

function closeMobileMenu() {
  const navLinks = $('#navLinks');
  const toggle = $('#navToggle');
  if (!navLinks) return;
  navLinks.classList.remove('open');
  toggle?.classList.remove('open');
}

function updateNavOnScroll() {
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Dark Mode ---------- */
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    // Keine Auswahl → System-Präferenz respektieren
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch (e) {
    return 'light';
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.style.colorScheme = theme;
  const btn = $('#themeToggle');
  if (btn) {
    btn.setAttribute('aria-pressed', theme === 'dark');
    btn.setAttribute('aria-label', theme === 'dark'
      ? TRANSLATIONS[currentLang].a11y.themeDark
      : TRANSLATIONS[currentLang].a11y.themeLight);
  }
  try { localStorage.setItem('portfolio-theme', theme); } catch (e) {}
}

function setupThemeToggle() {
  const btn = $('#themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
  // System-Änderungen mitspielen (nur wenn der Nutzer nichts manuell gewählt hat)
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      try {
        if (!localStorage.getItem('portfolio-theme')) applyTheme(e.matches ? 'dark' : 'light');
      } catch (err) {}
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
}

/* ---------- Zurück nach oben ---------- */
function setupToTop() {
  const btn = $('#toTop');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('show', window.scrollY > 600);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Init ---------- */
(function init() {
  // Gespeicherte Sprache wiederherstellen
  try {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved && SITE_CONFIG.languages.includes(saved)) currentLang = saved;
  } catch (e) {}

  // Theme anwenden (gespeichert oder System-Präferenz)
  applyTheme(getInitialTheme());

  renderLangSwitch();
  setupMobileMenu();
  setupThemeToggle();
  setupToTop();
  renderAll();
})();
