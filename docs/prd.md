
# PRD: Persönliche Portfolio-Website (Azure Static Web Apps, Free Plan)

## 1) Überblick
Eine schnelle, zugängliche und wartungsarme Portfolio-Landing-Page für eine erfahrene IT-Architekturberater:in. Inhalte: **Karriere (Timeline)**, **Ausbildung**, **Kenntnisse/Skills**, **Projektportfolio**, **Kontakt** (mit optionalem serverlosem Kontaktformular), **Impressum/Datenschutz**. Deployment auf **Azure Static Web Apps – Free Plan** mit automatischer **GitHub Actions**-Pipeline aus dem Azure-Portal (YAML wird generiert).

## 2) Ziele & Nicht-Ziele
**Ziele**
- Klar strukturierte, moderne Landing-Page mit Fokus auf Expertise, Projekte und CV.
- Sehr schnelles Laden (CDN), gute Lighthouse-Scores (Performance/SEO/Best Practices/Accessibility ≥ 90).
- Vollständig statisch (kein Build-Tool zwingend erforderlich), optional leichte Interaktivität.
- CI/CD: Jeder Push auf den Main-Branch triggert Build & Deploy via GitHub Actions (von Azure generiert).
- Einfache Pflege der Inhalte über **JSON-Dateien** im Repo, kein CMS nötig.

**Nicht-Ziele**
- Kein komplexes Headless-CMS.
- Kein schweres JS-Framework nötig (React/Vue/Svelte). Optional möglich, aber nicht Teil des MVP.
- Kein kostenpflichtiger Azure-Plan.

## 3) Zielgruppe & Nutzerziele
- **Hiring Manager / Fachentscheider**: Schneller Überblick über Werdegang, Skills, Projekte, Referenzen.
- **Peers/Kund:innen**: Technische Tiefe, Architektur-Fokus, Tech-Stack-Kompetenz.
- **Recruiter**: Downloadbarer komprimierter CV, klare Kontaktdaten.

## 4) Design-Referenz & Stil
- Orientierung: *Deneb Jekyll* (helle Typografie, großzügige Abstände, klare Sektionen).
- **Design-Prinzipien**: Minimalistisch, lesefreundlich, responsive, dunkler/heller Modus (Toggle).
- **Farben**: Neutrale Basis, 1 Akzentfarbe.
- **Typo**: Systemfont-Stack oder Google Font (z. B. Inter) über `<link>`.
- **Icons**: Optionale SVG-Icons.

## 5) Informationsarchitektur & Sitemap ✅ IMPLEMENTIERT
- `/` Landing (Hero mit Profilbild, Teaser Projekte, Skills, Karriere-Highlights, Kontakt-CTA)
- `/projekte` Projekte (filterbar nach Technologie / Rolle, 14 Projekte)
- `/karriere` Vollständige Timeline (Berufserfahrung 2003-2025, Achievements)
- `/ausbildung` **Formale Ausbildung** (TU Berlin, University of Florida)
- `/zertifikate` **Berufliche Zertifikate** (22 Badges mit Credly-Verifikation)
- `/kenntnisse` Skill-Matrix (9 Kategorien, 80+ Skills mit Level/Jahren)
- `/kontakt` Kontaktkarte + E-Mail/LinkedIn
- `/impressum` Impressum (Rechtliche Angaben)
- `/datenschutz` Datenschutz (DSGVO-konform)

## 6) Kernsektionen & Inhalte (MVP) ✅ IMPLEMENTIERT
**Hero** ✅
- Name, Claim, Kurzbeschreibung, CTA-Buttons
- **Profilbild**: 450px Kreis rechts (Desktop), oben (Mobile)
- LinkedIn-Link (kein GitHub)

**Projekte (Portfolio)**
- Karten mit: Titel, kurze Beschreibung, Rolle, Zeitraum, Tech-Tags, Links (Repo/Live).
- Filter (Client-seitig) nach Tags/Technologien.

**Karriere (Timeline)**
- Chronologische Stationen mit Firma, Rolle, Zeitraum, Highlights (Stichpunkte).

**Ausbildung** (Separate Seite)
- **Fokus**: Akademische Qualifikationen (Studium, Berufsausbildung)
- **Inhalt**: Abschlüsse, Institution, Zeitraum, Spezialisierung
- **Darstellung**: Chronologische Liste nach Ausbildungstyp

**Zertifikate** (Separate Seite)
- **Fokus**: Berufliche Zertifikate und Badges (Microsoft, AWS, TOGAF, Scrum.org, CNCF)
- **Anbieter-Filter**: Filterung nach Zertifizierungsanbieter
- **Badge-Integration**: Offizielle Badges mit Credly-Verifikation
- **Chronologische Darstellung**: Neueste Zertifikate zuerst
- **Verifikation**: Direkte Links zu Badge-Verifikationsseiten

**Kenntnisse / Skill-Matrix**
- Kategorien (Architektur, Cloud, Dev, Data/AI, Security, Methoden).
- Level (0–5) + Jahre Erfahrung, tags.

**Kontakt**
- E-Mail-Link, LinkedIn/GitHub-Links.
- Optional: leichtes Formular → serverlose Funktion (Azure Functions über Static Web Apps).

**Rechtliches**
- Impressum/Datenschutz (statisch).

## 7) Komponentenbibliothek (HTML/CSS, minimal)
- **Header/Nav** (sticky), **Footer**, **Section**-Wrapper
- **Button**, **Badge/Tag**
- **Card** (Projektkarte), **Timeline-Item**
- **Skill-Bar** (progress), **Pill** (Kompetenz-Tag)
- **Modal** (optional für Projektdetails)
- **Theme Toggle** (Light/Dark per `prefers-color-scheme` + Toggle)

## 8) Technische Anforderungen & Architektur
- **Hosting**: Azure Static Web Apps – Free Plan.
- **CI/CD**: GitHub Repo → Azure SWA → „From GitHub“ verbinden → Azure erstellt Workflow & Secret automatisch.
- **Framework**: **Kein** Build-Framework nötig. Reines HTML/CSS/JS.
- **CSS-Framework**: **Pico.css** per CDN (class-light, barrierearm) + `custom.css` für Feinschliff.
  - Alternativ: Tailwind Play CDN möglich, aber Pico.css ist simpler ohne Build-Step.
- **JS**: Vanilla JS, optional **Alpine.js** (CDN) für kleine Interaktionen (Filter, Toggles).
- **Datenhaltung**: Statische JSON-Dateien im Ordner `/data/*.json`, clientseitig geladen und gerendert.
- **Formular (optional)**: Azure Static Web Apps **Functions** (Node 18) im Ordner `/api/*` mit CORS, E-Mail-Versand via SendGrid (Free Tier) oder Speicherung als einfache JSON in Storage (optional).
- **Assets**: `/assets/img`, `/assets/icons`, `/assets/css`, `/assets/js`.

## 9) Performance, SEO & Accessibility
- **Leistung**: LCP < 2.5 s auf 3G Fast; Bilder responsiv (`<img srcset>`), lazy-loading; kein Blocking-JS.
- **SEO**: `meta`-Tags (title, description), Open Graph/Twitter, strukturierte Daten (Person/Organization).
- **Sitemap**: `/sitemap.xml`, `robots.txt`.
- **A11y**: WCAG 2.1 AA, Fokuszustände, Kontrast, Semantik (header/main/section/nav), ARIA wo nötig.
- **Dark Mode**: `prefers-color-scheme` + Toggle, persistiert in `localStorage`.

## 10) Internationalisierung (optional)
- DE als Standard; EN optional.
- Strategie: Sprachschalter + getrennte JSON-Dateien `/data/de/*.json`, `/data/en/*.json`.
- URLs entweder `/en/...` oder gleiche URL mit dynamischer Textladung.

## 11) Analytics (optional)
- **Plausible** oder **Umami** via `<script>`; DSGVO-Hinweis in Datenschutz ergänzen.
- Keine Cookies im MVP.

## 12) Deployment (Azure SWA) – Anforderungen
- Repo-Struktur statisch (ohne Build): App Location `/`, Output Location `/`.
- Azure SWA im Portal erstellen → Quelle „GitHub“ → Repo/Branch wählen → Create.
- Azure generiert GitHub Actions Workflow + Secret. Push auf Main = auto-Deploy.
- Custom Domain + SSL im Free Plan möglich.

## 13) Acceptance Criteria
- [ ] Lighthouse (Mobile): **≥90** in Performance, SEO, Best Practices, Accessibility.
- [ ] Responsive: Breakpoints für ≥320px, ≥768px, ≥1024px, ≥1440px.
- [ ] Startseite ≤ 150 KB CSS/JS (gezipped, ohne Bilder).
- [ ] JSON-basierte Inhalte werden korrekt gerendert (Projekte, Skills, Timeline).
- [ ] Filter auf `/projekte` funktioniert clientseitig ohne Reload.
- [ ] Dark/Light Toggle vorhanden und persistiert.
- [ ] Impressum/Datenschutz vorhanden und verlinkt im Footer.
- [ ] CI/CD: GitHub Actions läuft grün, Deploy auf Azure-URL.
- [ ] Fehlerfreies 404-Fallback (SWA Standard oder `staticwebapp.config.json`).

## 14) Beispiel-Dateistruktur
```
/ (Repo-Root)
├─ index.html
├─ projekte.html
├─ karriere.html
├─ ausbildung.html
├─ kenntnisse.html
├─ kontakt.html
├─ impressum.html
├─ datenschutz.html
├─ cv.pdf                  # optional
├─ data/
│  ├─ projects.json
│  ├─ career.json
│  ├─ education.json
│  ├─ skills.json
│  └─ settings.json        # Name, Claim, Social Links, i18n
├─ assets/
│  ├─ css/
│  │  ├─ pico.min.css      # via CDN oder lokal
│  │  └─ custom.css
│  ├─ js/
│  │  ├─ main.js
│  │  └─ filters.js
│  └─ img/                 # Bilder, Logos
├─ api/                    # optional SWA Functions (Kontakt)
│  └─ send-contact/index.js
├─ staticwebapp.config.json # optional Routing/Headers
└─ README.md
```

## 15) Content-Modelle (JSON-Beispiele)
**`data/settings.json`**
```json
{
  "name": "Vorname Nachname",
  "claim": "IT-Architektur | Cloud | AI",
  "location": "Deutschland",
  "email": "you@example.com",
  "socials": {
    "github": "https://github.com/username",
    "linkedin": "https://www.linkedin.com/in/username/"
  },
  "accentColor": "#3b82f6",
  "language": "de"
}
```

**`data/projects.json`**
```json
[
  {
    "title": "Cloud Migration Programm",
    "role": "Lead IT-Architekt",
    "period": "2023–2024",
    "summary": "Migration von 40+ Anwendungen in Azure, Landing Zone, IaC, DevOps.",
    "highlights": [
      "Well-Architected Review",
      "Bicep/Terraform IaC-Standards",
      "Zero-downtime Cutover"
    ],
    "tech": ["Azure", "Bicep", "AKS", "APIM", "Azure DevOps", "GitHub"],
    "links": {
      "repo": "",
      "live": ""
    },
    "cover": "assets/img/proj-migration.jpg",
    "tags": ["Cloud", "Security", "DevOps"]
  }
]
```

**`data/career.json`**
```json
[
  {
    "company": "Unternehmen A",
    "role": "Principal Architect",
    "period": "2019–heute",
    "achievements": [
      "Einführung Architektur-Governance und Guardrails",
      "Skalierung von Beraterprodukten"
    ]
  },
  {
    "company": "Unternehmen B",
    "role": "Senior IT Consultant",
    "period": "2012–2019",
    "achievements": ["Microservices-Strategie", "CI/CD Standardisierung"]
  }
]
```

**`data/education.json`**
```json
[
  {
    "type": "Ausbildung",
    "title": "Fachinformatiker:in Anwendungsentwicklung",
    "institution": "IHK",
    "year": 200X
  },
  {
    "type": "Studium",
    "title": "Wirtschaftsmathematik",
    "institution": "Universität XYZ",
    "year": 200X
  },
  {
    "type": "Zertifikat",
    "title": "Azure Solutions Architect Expert",
    "institution": "Microsoft",
    "year": 202X
  }
]
```

**`data/skills.json`**
```json
{
  "Architecture": [
    {"name": "Enterprise Architecture", "level": 5, "years": 10},
    {"name": "Event-Driven", "level": 4, "years": 6}
  ],
  "Cloud": [
    {"name": "Azure", "level": 5, "years": 8},
    {"name": "AWS", "level": 3, "years": 3}
  ],
  "AI/Data": [
    {"name": "LLM Integration", "level": 4, "years": 2},
    {"name": "Databricks", "level": 3, "years": 2}
  ],
  "DevOps": [
    {"name": "IaC (Bicep/Terraform)", "level": 4, "years": 5},
    {"name": "GitHub Actions", "level": 4, "years": 5}
  ]
}
```

## 16) Interaktionsdesign & Verhalten
- **Filter** (Projekte): Checkboxen/Pills (Mehrfachauswahl) → zeigt nur Karten mit passenden `tags`/`tech`.
- **Timeline**: Vertikal, mobil einklappbar.
- **Skill-Matrix**: Balken (`<progress>`), Tooltip mit Jahren.
- **Theme Toggle**: Schalter in der Navbar, speichert Einstellung in `localStorage`.

## 17) Datenschutz & Rechtliches
- Impressum/Datenschutz als separate Seiten.
- Keine Cookies im MVP; bei Analytics entsprechender Hinweis.
- Kontaktformular: Double-Opt-In nicht notwendig, aber SPAM-Schutz (Honeypot-Feld, Zeitstempel).

## 18) Testfälle (stichprobenartig)
- **Routing**: Alle Seiten erreichbar; 404 zeigt freundlichen Fallback.
- **JSON-Ladevorgang**: Netzwerkfehler simulieren → UI zeigt Fehlermeldung.
- **Responsive**: Karten-Grid bricht korrekt um; Navigation als Burger-Menü auf <768px.
- **A11y**: Tastaturnavigation ohne Maus vollständig möglich.
- **Deploy**: Push löst GitHub Actions aus; Azure URL aktualisiert sich.

## 19) Tasks für den Coding-Agenten (Umsetzungsplan)
1. **Gerüst aufsetzen**: Repo-Struktur gemäß §14 erstellen; Pico.css via CDN einbinden; `custom.css` anlegen.
2. **Layout**: Header/Nav, Footer, Section-Komponenten, Grid-System (CSS).
3. **Startseite** (`index.html`): Hero, Projekt-Teaser (3 Karten), Skill-Teaser (Top-Kategorien), Karriere-Highlights, CTA „Kontakt“.
4. **Projekte**: `projekte.html` mit Filter-UI (Vanilla JS), dynamisches Rendern aus `projects.json`.
5. **Karriere**: `karriere.html` Timeline aus `career.json` gerendert.
6. **Ausbildung**: `ausbildung.html` aus `education.json`.
7. **Kenntnisse**: `kenntnisse.html` Skill-Matrix aus `skills.json`.
8. **Kontakt**: `kontakt.html` mit E-Mail-Link; optional Formular + `/api/send-contact` (Template mit SendGrid-Stub).
9. **Rechtliches**: `impressum.html`, `datenschutz.html` statisch befüllen (Platzhalter).
10. **Theme Toggle**: Light/Dark mit CSS-Variablen, Toggle + persistente Einstellung.
11. **SEO & Meta**: `<title>`, `<meta name="description">`, OG/Twitter-Metas; `sitemap.xml`, `robots.txt` generieren.
12. **Performance**: Bilder optimieren, Lazy-Loading, CSS/JS minimieren (so klein wie möglich).
13. **Konfiguration**: `staticwebapp.config.json` (404-Fallback, Headers [Cache, CSP light]).
14. **CI/CD**: Hinweis in README, wie im Azure-Portal SWA erstellt und GitHub verknüpft wird (YAML wird generiert).
15. **Tests**: Lighthouse-Check, a11y-Tab-Flow prüfen, JSON-Fehlerhandling testen.

## 20) Abnahmekriterien (DoD)
- Repo entspricht Struktur, Seiten rendern Inhalte vollständig aus JSON.
- Azure SWA Free: Live-URL aktiv, Deploys bei jedem Push.
- Lighthouse- und A11y-Kriterien erfüllt; Navigation und Filter ohne Fehler.
- Impressum/Datenschutz vorhanden; Kontakt mindestens als E-Mail-Link.
- README erklärt Pflege der JSON-Inhalte und Deployment-Schritte kurz.

---

### Hinweise zur Umsetzung ohne Build-Tool
- **Pico.css** per CDN: `<link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">`
- **Alpine.js** (optional): `<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>`
- Datendateien per `fetch('/data/projects.json')` laden und ins DOM rendern.
- Falls später gewünscht, kann ein Static Site Generator (z. B. Astro) als v2 ergänzt werden – Azure SWA unterstützt Builds.

