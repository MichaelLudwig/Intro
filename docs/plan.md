# Implementierungsplan: Portfolio-Website

Detaillierter Plan zur Umsetzung der Portfolio-Website basierend auf der PRD für Azure Static Web Apps.

## **Phase 1: Projekt-Grundstruktur (Foundation)**

### 1.1 Ordnerstruktur erstellen
```
/
├─ index.html
├─ projekte.html
├─ karriere.html
├─ ausbildung.html
├─ zertifikate.html
├─ kenntnisse.html
├─ kontakt.html
├─ impressum.html
├─ datenschutz.html
├─ data/
│  ├─ settings.json
│  ├─ projects.json
│  ├─ career.json
│  ├─ education.json
│  ├─ certificates.json
│  └─ skills.json
├─ assets/
│  ├─ css/
│  │  └─ custom.css
│  ├─ js/
│  │  ├─ main.js
│  │  └─ filters.js
│  └─ img/
├─ api/ (optional für Kontaktformular)
├─ staticwebapp.config.json
├─ sitemap.xml
└─ robots.txt
```

### 1.2 Basis-HTML-Template erstellen
- DOCTYPE HTML5, deutsche Sprache (`lang="de"`)
- Meta-Tags für SEO und Responsive Design
- Pico.css via CDN einbinden
- Custom CSS einbinden
- Basis-Navigation und Footer-Struktur

## **Phase 2: Layout & Design-System**

### 2.1 CSS-Framework Setup
- **Pico.css** via CDN: `https://unpkg.com/@picocss/pico@latest/css/pico.min.css`
- Custom CSS-Variablen für:
  - Farbschema (Light/Dark Mode)
  - Typografie-Skalierung  
  - Spacing-System
  - Breakpoints (≥320px, ≥768px, ≥1024px, ≥1440px)

### 2.2 Komponenten-Bibliothek
- **Header/Navigation**: Sticky Navigation mit Logo und Menü
- **Footer**: Kontaktlinks, Rechtliches, Social Media
- **Cards**: Projekt-Karten, Timeline-Items
- **Buttons**: Primary, Secondary, Ghost-Varianten
- **Badges/Tags**: Skill-Tags, Tech-Stack-Labels
- **Progress Bars**: Skill-Level-Anzeige (0-5 Skala)
- **Theme Toggle**: Light/Dark Mode Switch

## **Phase 3: Content-Management (JSON-basiert)**

### 3.1 Datenstrukturen erstellen

**data/settings.json** - Globale Einstellungen
```json
{
  "name": "Micha",
  "claim": "IT-Architektur | Cloud | AI",
  "location": "Deutschland",
  "email": "kontakt@example.com",
  "socials": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  },
  "accentColor": "#3b82f6",
  "language": "de"
}
```

**data/projects.json** - Portfolio-Projekte
- Titel, Rolle, Zeitraum, Zusammenfassung
- Tech-Stack, Tags für Filterung
- Links zu Repository/Live-Demo
- Cover-Bilder

**data/career.json** - Karriere-Timeline
- Unternehmen, Position, Zeitraum
- Achievements und Highlights
- Chronologische Sortierung

**data/education.json** - Formale Ausbildung
- Typ (Studium, Ausbildung)
- Institution, Titel, Jahr
- Akademische Qualifikationen

**data/certificates.json** - Berufliche Zertifikate
- Zertifikatstitel, Anbieter, Jahr
- Badge-Links zu Credly/Verifikation
- Details und Gültigkeitsdaten

**data/skills.json** - Skill-Matrix
- Kategorien (Architecture, Cloud, AI/Data, DevOps)
- Level (0-5), Jahre Erfahrung
- Technologie-Tags

### 3.2 Content-Rendering-System
- Fetch-API für JSON-Daten laden
- Template-basiertes DOM-Rendering
- Error-Handling für Netzwerkfehler
- Loading-States während Datenladung

## **Phase 4: Seitenimplementierung**

### 4.1 Landing Page (index.html)
- **Hero-Sektion**: Name, Claim, Kurzbeschreibung, CTA-Buttons
- **Projekt-Teaser**: Top 3 Projekte als Cards
- **Skill-Highlights**: Wichtigste Kompetenzen visualisiert
- **Karriere-Teaser**: Aktuelle Position und Highlights
- **Kontakt-CTA**: Direkte Kontaktmöglichkeiten

### 4.2 Projekte-Seite (projekte.html)
- Vollständige Projekt-Liste als responsive Cards
- **Filter-Funktionalität**: 
  - Nach Tech-Stack filtern
  - Nach Rolle/Tags filtern
  - Mehrfachauswahl möglich
  - Reset-Funktion
- Responsive Grid-Layout (1-3 Spalten)

### 4.3 Karriere-Seite (karriere.html)
- Chronologische Timeline (vertikal)
- Firma, Rolle, Zeitraum, Achievements
- Mobile-optimierte Darstellung (einklappbar)
- Hover-Effekte für Interaktivität

### 4.4 Ausbildung-Seite (ausbildung.html) ✅
- **Nur formale Ausbildung** (getrennt von Zertifikaten)
- Kategorisiert nach Typ (Studium, Berufsausbildung)
- Chronologische Sortierung
- Fokus auf akademische Qualifikationen
- 2 Einträge: TU Berlin + University of Florida

### 4.5 Zertifikate-Seite (zertifikate.html) ✅
- **Komplett separate Seite** für berufliche Zertifikate
- **22 Zertifikate** von 5 Anbietern (2013-2024)
- **Filter nach Anbieter**: Microsoft, AWS, TOGAF, Scrum.org, CNCF
- **Badge-Integration**: Alle Links zu Credly-Profil
- **Offizielle Badges**: 🏆 "Badge ansehen" Buttons
- **Chronologische Sortierung**: Neueste zuerst

### 4.6 Kenntnisse-Seite (kenntnisse.html)
- Skill-Matrix mit Progress-Bars
- Kategorien als Tabs oder Accordions
- Tooltip mit Jahren Erfahrung
- Visuelle Level-Indikatoren (0-5)

### 4.7 Kontakt-Seite (kontakt.html)
- E-Mail-Link, Social Media Links
- Optional: Kontaktformular (siehe Phase 9)
- Standort-Information
- Verfügbarkeits-Status

### 4.8 Rechtliche Seiten
- **Impressum**: Statische Inhalte, rechtskonforme Angaben
- **Datenschutz**: DSGVO-konforme Datenschutzerklärung

## **Phase 5: Interaktivität & JavaScript**

### 5.1 Core-Funktionalitäten (Vanilla JS)
- **Theme Toggle**: 
  - Light/Dark Mode Switch
  - `prefers-color-scheme` Detection
  - localStorage-Persistierung
  - CSS Custom Properties Update
- **Navigation**: 
  - Mobile Burger-Menü
  - Smooth Scrolling für Anchor-Links
  - Active State Management
- **Projekt-Filter**: 
  - Client-seitige Filterung ohne Page-Reload
  - URL-Parameter für Deep-Links
  - Animation beim Ein-/Ausblenden

### 5.2 Performance-optimierte Implementierung
- Event Delegation für bessere Performance
- Debouncing für Search/Filter-Inputs
- Intersection Observer für Lazy Loading
- RequestAnimationFrame für Animationen

## **Phase 6: Performance & SEO-Optimierung**

### 6.1 Performance-Optimierung
- **Bilder**: 
  - Responsive Images mit `srcset` und `sizes`
  - WebP-Format mit Fallback
  - Lazy Loading für nicht-kritische Bilder
- **CSS/JS**: 
  - Kritisches CSS inline
  - Non-blocking CSS/JS Loading
  - Minimierung und Komprimierung
- **Lighthouse-Ziel**: ≥90 in allen Kategorien (Performance, SEO, Best Practices, Accessibility)

### 6.2 SEO-Optimierung
- **Meta-Tags**: Unique Title und Description für jede Seite
- **Open Graph**: Social Media Previews mit Bildern
- **Twitter Cards**: Optimierte Twitter-Previews
- **Strukturierte Daten**: 
  - Person Schema für Hauptseite
  - Organization Schema falls zutreffend
  - BreadcrumbList für Navigation
- **Sitemap.xml**: Alle Seiten mit Prioritäten
- **robots.txt**: Suchmaschinen-Anweisungen

## **Phase 7: Accessibility (WCAG 2.1 AA)**

### 7.1 Semantisches HTML
- Korrekte HTML5-Struktur: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- Überschriften-Hierarchie (h1-h6)
- Listen für gruppierte Inhalte
- Formulare mit korrekten Labels

### 7.2 ARIA und Interaktivität
- ARIA-Labels wo semantisches HTML nicht ausreicht
- ARIA-Expanded für aufklappbare Elemente
- ARIA-Hidden für dekorative Elemente
- Focus-Management für dynamische Inhalte

### 7.3 Barrierefreiheit
- **Fokus-Management**: Sichtbare Fokuszustände
- **Kontrast**: Mindestens 4.5:1 Ratio (AA-Standard)
- **Tastatur-Navigation**: Vollständig ohne Maus bedienbar
- **Screen Reader**: Aussagekräftige Alt-Texte und Labels

## **Phase 8: Konfiguration für Azure Static Web Apps**

### 8.1 staticwebapp.config.json
```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    },
    {
      "route": "/*",
      "serve": "/404.html",
      "statusCode": 404
    }
  ],
  "responseOverrides": {
    "404": {
      "redirect": "/",
      "statusCode": 302
    }
  },
  "globalHeaders": {
    "Cache-Control": "public, max-age=31536000, immutable"
  },
  "mimeTypes": {
    ".json": "application/json"
  }
}
```

### 8.2 404-Seite
- Benutzerfreundliche 404-Seite erstellen
- Navigation zurück zur Startseite
- Suchfunktion oder Sitemap

## **Phase 9: Optional - Serverless Features**

### 9.1 Kontaktformular (Azure Functions)
```javascript
// api/send-contact/index.js
module.exports = async function (context, req) {
    // Validierung der Eingaben
    // Spam-Protection (Honeypot, Rate Limiting)
    // E-Mail-Versand via SendGrid
    // Logging und Error-Handling
}
```

### 9.2 Formular-Integration
- HTML-Formular mit Validierung
- Client-seitige Validierung
- Loading-States und Success/Error-Messages
- CSRF-Schutz und Honeypot-Feld

## **Phase 10: Testing & Qualitätssicherung**

### 10.1 Automatisierte Tests
- **Lighthouse CI**: Performance, SEO, Accessibility
- **HTML Validation**: W3C Markup Validator
- **Link Checking**: Alle internen und externen Links
- **JSON Schema Validation**: Datenstrukturen prüfen

### 10.2 Manuelle Tests
- **Responsive Design**: Alle definierten Breakpoints
- **Cross-Browser**: Chrome, Firefox, Safari, Edge
- **Accessibility**: Screen Reader Testing, Tastatur-Navigation
- **Content Loading**: JSON-Fehlerbehandlung testen
- **Theme Toggle**: Persistierung zwischen Sessions

### 10.3 Performance Testing
- **Core Web Vitals**: LCP, FID, CLS messen
- **Network Throttling**: 3G Fast Simulation
- **Image Optimization**: Größe und Format prüfen

## **Akzeptanzkriterien (Definition of Done)**

### Technische Kriterien
- ✅ **Performance**: Lighthouse ≥90 in allen Kategorien
- ✅ **Responsive**: Funktioniert auf allen definierten Breakpoints
- ✅ **Accessibility**: WCAG 2.1 AA konform
- ✅ **SEO**: Alle Meta-Tags, Sitemap, strukturierte Daten vorhanden
- ✅ **Startseite**: ≤ 150 KB CSS/JS (gezipped, ohne Bilder)

### Funktionale Kriterien
- ✅ **Content**: JSON-basierte Inhalte rendern korrekt
- ✅ **Filter**: Projekt-Filter funktioniert clientseitig ohne Reload
- ✅ **Theme**: Dark/Light Toggle vorhanden und persistiert
- ✅ **Navigation**: Alle Seiten erreichbar, 404-Fallback funktioniert
- ✅ **Forms**: Kontaktformular (falls implementiert) funktioniert

### Content-Kriterien
- ✅ **Legal**: Impressum/Datenschutz vorhanden und verlinkt
- ✅ **Contact**: Mindestens E-Mail-Link verfügbar
- ✅ **Portfolio**: Projekte mit Filtern dargestellt
- ✅ **CV**: Karriere-Timeline vollständig

## **Externe Konfiguration (nicht Teil der Implementierung)**

### Azure Static Web Apps Setup
> **Hinweis**: Diese Schritte werden manuell im Azure Portal durchgeführt und sind nicht Teil der Code-Implementierung.

1. **Azure Portal**: 
   - Static Web Apps Ressource erstellen
   - "From GitHub" als Quelle wählen
   - Repository und Branch auswählen
   - App Location: `/` (Root)
   - Output Location: `/` (da kein Build-Tool)

2. **GitHub Integration**:
   - Azure erstellt automatisch GitHub Actions Workflow
   - Azure fügt Repository Secret hinzu
   - Jeder Push auf main-Branch triggert Deployment

3. **Custom Domain** (optional):
   - Domain im Azure Portal konfigurieren
   - SSL-Zertifikat wird automatisch bereitgestellt

## **Zeitschätzung**

| Phase | Beschreibung | Geschätzte Zeit |
|-------|--------------|-----------------|
| 1-2 | Grundstruktur & Design | 2-3 Stunden |
| 3-4 | Content & HTML-Seiten | 4-5 Stunden |
| 5-6 | JavaScript & Performance | 2-3 Stunden |
| 7 | Accessibility | 1-2 Stunden |
| 8 | Azure-Konfiguration | 1 Stunde |
| 9 | Optional Features | 2-3 Stunden |
| 10 | Testing & QS | 2-3 Stunden |

**Gesamt**: ~12-18 Stunden für vollständige Implementierung

## **Nächste Schritte**

1. Projekt-Grundstruktur erstellen (Phase 1)
2. HTML-Templates mit Pico.css implementieren (Phase 2)
3. JSON-Datenstrukturen anlegen und befüllen (Phase 3)
4. Seite für Seite implementieren (Phase 4)
5. JavaScript-Funktionalitäten hinzufügen (Phase 5)
6. Performance und SEO optimieren (Phase 6-7)
7. Azure-Konfiguration vorbereiten (Phase 8)
8. Testing und Qualitätssicherung (Phase 10)

Die Implementierung erfolgt iterativ, wobei nach jeder Phase eine funktionsfähige Version der Website verfügbar ist.
