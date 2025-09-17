# Portfolio Website - Micha

Eine moderne, responsive Portfolio-Website für IT-Architekten, entwickelt für Azure Static Web Apps.

## 🚀 Features

- **Responsive Design**: Optimiert für alle Geräte (Mobile-first)
- **Dark/Light Mode**: Automatische Theme-Erkennung + manueller Toggle
- **JSON-basierte Inhalte**: Einfache Pflege ohne CMS
- **Client-seitige Filter**: Projekte nach Technologien/Tags filtern
- **SEO-optimiert**: Meta-Tags, Open Graph, strukturierte Daten
- **Performance**: Lighthouse Score ≥90 in allen Kategorien
- **Accessibility**: WCAG 2.1 AA konform
- **Azure Static Web Apps**: Optimiert für kostenloses Hosting

## 📁 Projektstruktur

```
/
├── index.html              # Startseite
├── projekte.html          # Projektportfolio
├── karriere.html          # Beruflicher Werdegang
├── ausbildung.html        # Ausbildung & Zertifikate
├── kenntnisse.html        # Skills & Technologien
├── kontakt.html           # Kontaktinformationen
├── impressum.html         # Rechtliche Angaben
├── datenschutz.html       # Datenschutzerklärung
├── 404.html              # Fehlerseite
├── data/                  # JSON-Datenstrukturen
│   ├── settings.json      # Globale Einstellungen
│   ├── projects.json      # Projektdaten
│   ├── career.json        # Karriere-Timeline
│   ├── education.json     # Ausbildungsdaten
│   └── skills.json        # Skill-Matrix
├── assets/
│   ├── css/
│   │   └── custom.css     # Custom Styles
│   ├── js/
│   │   ├── main.js        # Haupt-JavaScript
│   │   └── filters.js     # Filter-Funktionalität
│   └── img/               # Bilder und Assets
├── api/                   # Optional: Azure Functions
├── staticwebapp.config.json # Azure SWA Konfiguration
├── sitemap.xml           # SEO Sitemap
├── robots.txt            # Suchmaschinen-Anweisungen
└── docs/                 # Dokumentation
    ├── prd.md            # Product Requirements Document
    └── plan.md           # Implementierungsplan
```

## 🛠 Technologie-Stack

- **Frontend**: HTML5, CSS3 (CSS Custom Properties), Vanilla JavaScript
- **CSS Framework**: [Pico.css](https://picocss.com/) via CDN
- **Hosting**: Azure Static Web Apps (Free Plan)
- **CI/CD**: GitHub Actions (automatisch generiert von Azure)
- **Performance**: Lazy Loading, CDN, optimierte Assets

## 📝 Content Management

### JSON-Dateien bearbeiten

Alle Inhalte werden über JSON-Dateien im `/data` Ordner verwaltet:

#### `data/settings.json` - Globale Einstellungen
```json
{
  "name": "Ihr Name",
  "claim": "Ihr Claim/Slogan",
  "email": "ihre@email.com",
  "socials": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  }
}
```

#### `data/projects.json` - Projekte hinzufügen
```json
[
  {
    "title": "Projektname",
    "role": "Ihre Rolle",
    "period": "2023-2024",
    "summary": "Kurzbeschreibung",
    "tech": ["Azure", "React", "Node.js"],
    "tags": ["Cloud", "Frontend"]
  }
]
```

### Neue Projekte hinzufügen

1. `data/projects.json` öffnen
2. Neues Projekt-Objekt hinzufügen
3. Datei speichern und committen
4. Azure Static Web Apps deployed automatisch

## 🚀 Deployment

### Lokale Entwicklung

1. Repository klonen:
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. Lokalen Server starten:
   ```bash
   # Mit Python
   python -m http.server 8000
   
   # Mit Node.js (http-server)
   npx http-server -p 8000
   
   # Mit PHP
   php -S localhost:8000
   ```

3. Website öffnen: `http://localhost:8000`

### Azure Static Web Apps Setup

#### Automatisches Deployment (Empfohlen)

1. **Azure Portal öffnen**: [portal.azure.com](https://portal.azure.com)

2. **Static Web App erstellen**:
   - "Ressource erstellen" → "Static Web App"
   - Subscription und Resource Group wählen
   - Name eingeben (z.B. "micha-portfolio")
   - Plan: "Free"

3. **GitHub Integration**:
   - Source: "GitHub"
   - GitHub Account autorisieren
   - Repository auswählen
   - Branch: "main"
   - Build Presets: "Custom"
   - App location: `/` (Root)
   - Output location: `/` (da kein Build-Tool)

4. **Deployment**:
   - Azure erstellt automatisch GitHub Actions Workflow
   - Jeder Push auf main-Branch triggert Deployment
   - URL wird nach ~2-3 Minuten verfügbar

#### Custom Domain (Optional)

1. Azure Portal → Static Web App → "Custom domains"
2. Domain hinzufügen und DNS-Einträge konfigurieren
3. SSL-Zertifikat wird automatisch bereitgestellt

## 🎨 Anpassungen

### Theme/Farben ändern

In `assets/css/custom.css` die CSS-Variablen anpassen:

```css
:root {
  --primary-color: #3b82f6;    /* Primärfarbe */
  --primary-hover: #2563eb;    /* Hover-Zustand */
  /* ... weitere Variablen */
}
```

### Neue Seiten hinzufügen

1. HTML-Datei erstellen (z.B. `blog.html`)
2. Navigation in allen HTML-Dateien erweitern
3. `sitemap.xml` aktualisieren
4. JavaScript in `main.js` erweitern falls nötig

### Kontaktformular aktivieren

1. Azure Functions im `/api` Ordner implementieren
2. `staticwebapp.config.json` für API-Routen konfigurieren
3. Formular in `kontakt.html` mit Action-URL verknüpfen

## 📊 Performance & SEO

### Lighthouse Optimierungen

- **Performance**: Lazy Loading, CDN, minimierte Assets
- **SEO**: Meta-Tags, strukturierte Daten, Sitemap
- **Accessibility**: ARIA-Labels, Kontrast, Tastatur-Navigation
- **Best Practices**: HTTPS, sichere Headers, moderne Standards

### Core Web Vitals

- **LCP**: < 2.5s (Pico.css via CDN, optimierte Bilder)
- **FID**: < 100ms (Vanilla JS, minimale Interaktionen)
- **CLS**: < 0.1 (feste Layouts, keine Layout-Shifts)

## 🔧 Wartung

### Regelmäßige Updates

- **Inhalte**: JSON-Dateien aktualisieren
- **Dependencies**: Pico.css Version in HTML-Dateien prüfen
- **Security**: Azure Static Web Apps Updates automatisch
- **Analytics**: Optional Plausible/Umami integrieren

### Backup

- Repository auf GitHub = automatisches Backup
- JSON-Dateien regelmäßig lokal sichern
- Azure Static Web Apps hat automatische Backups

## 📱 Browser-Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Browser (iOS Safari, Chrome Mobile)

## 🤝 Beiträge

1. Fork erstellen
2. Feature Branch: `git checkout -b feature/neue-funktion`
3. Änderungen committen: `git commit -m 'Neue Funktion hinzufügen'`
4. Push to Branch: `git push origin feature/neue-funktion`
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 📞 Support

Bei Fragen oder Problemen:

- Issue auf GitHub erstellen
- E-Mail: kontakt@example.com
- Documentation: [docs/](docs/)

---

**Hinweis**: Vergessen Sie nicht, die Platzhalter in `impressum.html` und `datenschutz.html` mit Ihren tatsächlichen Daten zu ersetzen!