/* ============================================================
   KONFIGURATION / INHALTE  →  hier alles befüllen!
   ------------------------------------------------------------
   · Alles Inhalte der Website liegen in dieser einen Datei.
   · Füge deine eigenen Daten ein – ganz ohne Server oder Build.
   · Steuere Sichtbarkeit mit `enabled: true / false`.
   · Mehrsprachig: `de` (Deutsch) und `en` (Englisch).
   ============================================================ */

/* Basis-Einstellungen */
const SITE_CONFIG = {
  /* Sprach-Kürzel, die sichtbar sein sollen (Reihenfolge = Reihenfolge im Umschalter) */
  languages: ['de', 'en'],
  /* Standardsprache beim ersten Laden */
  defaultLanguage: 'en',
  /* Unterstützte Sprachen für <html lang> */
  localeNames: {
    de: 'Deutsch',
    en: 'English',
  },
};

/* Person & Branding */
const PROFILE = {
  name: '𝕯𝖊𝖛𝕮𝖔𝖉𝖊𝖗',
  logo: '𝕯𝖊𝖛𝕮𝖔𝖉𝖊𝖗',            // Text im Header
  role: {                          // Rolle(n) unter dem Namen
    de: 'Developer · Supporter',
    en: 'Developer · Supporter',
  },
  tagline: {
    de: 'ich baue web-anwendungen, schreibe software und code moderne discord bots',
    en: 'i build web apps, develop software, and create modern discord bots',
  },
  stats: [
    { value: '2+',  label: { de: 'jahre erfahrung', en: 'years of experience' } },
    { value: '5+', label: { de: 'partner',        en: 'partner' } },
    { value: '25+',label: { de: 'projekte',       en: 'projects' } },
  ],
};

/* Sichtbarkeit der Sektionen */
const SECTIONS = {
  about:    { enabled: true  },
  skills:   { enabled: true  },
  work:     { enabled: true  },
  career:   { enabled: true  },
  minecraft:{ enabled: true  },
  license:  { enabled: true  },
  contact:  { enabled: true  },
};

/* "Über mich" */
const ABOUT = {
  intro: {
    de: 'hi, ich bin DevCoder.',
    en: 'hi, i\'m DevCoder',
  },
  body: {
    de: 'ich programmiere seit mehreren jahren leidenschaftlich. angefangen mit kleinen discord bots bis hinzu partnerschaften und server administrationen.',
    en: 'i\'ve been passionate about programming for several years. starting with small discord bots and eventually moving on to partnerships and server administration.',
  },
};

/* Fähigkeiten – beliebig viele Gruppen erlaubt */
const SKILLS = [
  {
    title: { de: 'Programmierung', en: 'Programming' },
    items: [
      { de: 'python',                 en: 'python' },
      { de: 'java',                   en: 'java' },
      { de: 'discord-bot-entwicklung', en: 'discord bot development' },
      { de: 'web entwicklung', en: 'web development'}
    ],
  },
  {
    title: { de: 'minecraft', en: 'minecraft' },
    items: [
      { de: 'minecraft mods', en: 'minecraft mods'},
      { de: 'minecraft plugins', en: 'minecraft plugins' },
      { de: 'server entwickler', en: 'server developer'}
    ],
  },
  {
    title: { de: 'systeme & tools', en: 'systems & tools' },
    items: [
      { de: 'linux',                en: 'linux' },
      { de: 'server-administration', en: 'server administration' },
      { de: 'docker',               en: 'docker' },
      { de: 'git / github',         en: 'git / github' },
    ],
  },
];

/* Projekte (Web/Software). image: 'none' oder Farbwert für den Platzhalter
   → Hier eigene Projekte eintragen. Felder leer lassen = wird ausgeblendet. */
const PROJECTS = [
  {
    title: { de: 'minecraft kingdom 1+2', en: 'minecraft kingdom 1+2' },
    desc:  { de: 'ein königreich server mit teams und rollenverteilung', en: 'a kingdom server with teams and a structured role system' },
    tags:  ['#kingdoms', '#minecraft', '#java'],
    color: '#4f8cff',
    image: 'none',
    links: [],
  },
  {
    title: { de: 'eclipsplugindevs', en: 'eclipsplugindevs' },
    desc:  { de: 'modrinth organisation', en: 'modrinth organisation' },
    tags:  ['#minecraft mods', '#minecraft plugins', '#java'],
    color: '#22c55e',
    image: 'none',
    links: [https://modrinth.com/organization/eclipseplugindevs],
  },
  {
    title: { de: 'fightlabmc.de', en: 'fightlabmc.de' },
    desc:  { de: 'event server, pvp', en: 'event server, pvp' },
    tags:  ['#events', '#pvp', '#java', '#velocity'],
    color: '#4f8cff',
    image: 'none',
    links: [dsc.gg/fightlabmc],
  },
];

/* Werdegang – neueste zuerst, jeder Eintrag: period, role, place, desc
   → Hier eigene Stationen eintragen. */
const CAREER = [
  {
    period: { de: '2024', en: '2024' },
    role:   { de: 'erstes mal python', en: 'first time python' },
    place:  { de: '', en: '' },
    desc:   { de: 'hab das erste mal mit python angefangen', en: 'i started coding with python for the first time' },
  },
  {
    period: { de: '2025', en: '2025' },
    role:   { de: 'server entwicklung', en: 'server development' },
    place:  { de: '', en: '' },
    desc:   { de: 'verschiedene minecraft plugins / mods und discord bots', en: 'various minecraft plugins / mods, and discord bots.' },
  },
  {
    period: { de: '2026 - heute', en: '2026 - today' },
    role:   { de: 'mache partnerschaften, größere discord bots und manage minecraft server', en: 'i work on partnerships, build larger discord bots, and manage minecraft servers' },
    place:  { de: '', en: '' },
    desc:   { de: 'partnerschaften, python', en: 'partnerships, python' },
  },
];

/* Minecraft-Projekte – icon: nehme ein Unicode-Symbol, color: Akzentfarbe */
const MINECRAFT = [
  {
    name:   { de: 'modrinth organisation', en: 'modrinth organization' },
    desc:   { de: 'meine modrinth organisation. verschiedene plugins etc.', en: 'my modrinth organization - various plugins and more' },
    icon:   '✦',
    color:  '#22c55e',
    link:   { label: { de: 'Auf Modrinth →', en: 'On Modrinth →' }, url: 'https://modrinth.com/organization/eclipseplugindevs' },
  },
  {
    name:   { de: 'github', en: 'github' },
    desc:   { de: 'mein github', en: 'my github' },
    icon:   '⬢',
    color:  '#4f8cff',
    link:   { label: { de: 'Details ansehen →', en: 'View details →' }, url: 'https://github.com/DevCoderMC' },
  }
];

/* Lizenz – Regelbezeichnungen + Übersetzungen. status: 'allowed' | 'denied' */
const LICENSE = {
  intro: {
    de: 'Diese Lizenz gilt für die Minecraft-Modifikationen, Texture Packs, Data Packs und verwandten Inhalte von mir, die auf Modrinth und anderen Plattformen veröffentlicht werden - sofern nichts anderes angegeben ist.',
    en: 'This license applies to my Minecraft mods, texture packs, data packs, and related content published on Modrinth and other platforms, unless otherwise stated.',
  },
  rules: [
    { status: 'allowed', icon: 'check', title: { de: 'Private Nutzung', en: 'Private Use' },      desc: { de: 'Erlaubt - der Inhalt darf privat uneingeschränkt genutzt werden.', en: 'Allowed - the content may be used privately without restriction.' } },
    { status: 'allowed', icon: 'check', title: { de: 'Teilen', en: 'Sharing' },                    desc: { de: 'Erlaubt - allerdings nur über den offiziellen und unveränderten Download-Link.', en: 'Allowed - but only through the official, unmodified download link.' } },
    { status: 'denied',  icon: 'cross', title: { de: 'Änderungen', en: 'Modifications' },          desc: { de: 'Nicht erlaubt - Dateien dürfen nicht bearbeitet, verändert oder neu verpackt werden.', en: 'Not allowed - files may not be edited, modified or repackaged.' } },
    { status: 'denied',  icon: 'cross', title: { de: 'Weiterverteilung', en: 'Redistribution' },   desc: { de: 'Nicht erlaubt - veränderte Versionen dürfen in keiner Form weitergegeben werden.', en: 'Not allowed - modified versions may not be distributed in any form.' } },
    { status: 'denied',  icon: 'cross', title: { de: 'Kommerzielle Nutzung', en: 'Commercial Use' },desc: { de: 'Nicht erlaubt - der Verkauf oder die Monetarisierung des Inhalts ist ausdrücklich verboten.', en: 'Not allowed - the sale or monetisation of the content is expressly forbidden.' }, wide: true },
  ],
};

/* Kontakt */
const CONTACT = {
  email:   'devcodermc+portfolio@gmail.com',
  socials: [
    { label: 'GitHub',   url: 'https://github.com/DevCoderMC' },
    { label: 'Modrinth', url: 'https://modrinth.com/organization/eclipseplugindev' }
  ],
};

/* Übersetzungen für UI-Elemente (Navigation, Titel, Buttons, Footer) */
const TRANSLATIONS = {
  de: {
    nav: { about: 'Über', skills: 'Skills', work: 'Projekte', career: 'Werdegang', minecraft: 'Minecraft', license: 'Lizenz', contact: 'Kontakt' },
    hero: { hello: 'Hi, ich bin', scroll: 'Mehr entdecken' },
    sectionTitles: {
      about: 'Über mich',
      skills: 'Fähigkeiten',
      work: 'Ausgewählte Projekte',
      career: 'Werdegang',
      minecraft: 'Minecraft-Projekte',
      license: 'Lizenz',
      contact: 'Kontakt',
    },
    sectionLeads: {
      minecraft: 'Mods, Plugins, GitHub - veröffentlicht auf Modrinth und anderen Plattformen.',
      contact: 'Lust, etwas gemeinsam zu bauen? Schreib mir!',
    },
    buttons: { projects: 'Projekte ansehen', contact: 'Kontakt aufnehmen', email: 'E-Mail senden' },
    footer: { line: '© 2026 {name}. Alle Rechte vorbehalten. Siehe Lizenz-Abschnitt.' },
    a11y: { menu: 'Menü öffnen', scroll: 'Nach unten scrollen', themeLight: 'Helles Design aktivieren', themeDark: 'Dunkles Design aktivieren' },
  },
  en: {
    nav: { about: 'About', skills: 'Skills', work: 'Projects', career: 'Career', minecraft: 'Minecraft', license: 'License', contact: 'Contact' },
    hero: { hello: "Hi, I'm", scroll: 'Explore more' },
    sectionTitles: {
      about: 'About me',
      skills: 'Skills',
      work: 'Selected projects',
      career: 'Career',
      minecraft: 'Minecraft projects',
      license: 'License',
      contact: 'Contact',
    },
    sectionLeads: {
      minecraft: 'Mods, plugins, GitHub - published on Modrinth and other platforms.',
      contact: 'Want to build something together? Get in touch!',
    },
    license: { lead: 'License overview for Minecraft mods, texture packs, data packs and similar content.' },
    buttons: { projects: 'View projects', contact: 'Get in touch', email: 'Send email' },
    footer: { line: '© 2026 {name}. All rights reserved. See the license section.' },
    a11y: { menu: 'Open menu', scroll: 'Scroll down', themeLight: 'Activate light theme', themeDark: 'Activate dark theme' },
  },
};
