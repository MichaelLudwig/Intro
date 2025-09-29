/**
 * SVG Icon Loader und Manager
 * Lädt SVG-Icons aus dem assets/icons/ Ordner und fügt sie mit den Portfolio-Farben ein
 */

class IconManager {
    constructor() {
        this.iconCache = new Map();
        this.baseIconPath = 'assets/icons/';
    }

    /**
     * Lädt ein SVG-Icon und gibt es als Promise zurück
     */
    async loadIcon(iconPath) {
        if (this.iconCache.has(iconPath)) {
            return this.iconCache.get(iconPath);
        }

        try {
            const response = await fetch(`${this.baseIconPath}${iconPath}`);
            if (!response.ok) {
                throw new Error(`Icon nicht gefunden: ${iconPath}`);
            }
            
            const svgText = await response.text();
            this.iconCache.set(iconPath, svgText);
            return svgText;
        } catch (error) {
            console.warn(`Fehler beim Laden des Icons: ${iconPath}`, error);
            return null;
        }
    }

    /**
     * Erstellt ein Icon-Element mit den gewünschten Eigenschaften
     */
    async createIcon(iconPath, options = {}) {
        const {
            size = 'md',
            color = 'primary',
            className = '',
            hoverColor = null
        } = options;

        const svgContent = await this.loadIcon(iconPath);
        if (!svgContent) return null;

        // Erstelle Container-Element
        const iconContainer = document.createElement('span');
        iconContainer.className = `icon icon-${size} icon-${color} ${className}`;
        
        if (hoverColor) {
            iconContainer.classList.add(`icon-hover-${hoverColor}`);
        }

        // Für Orange-Töne: Ersetze Fill-Farben für Zwei-Farben-Effekt
        let processedSVG = svgContent;
        
        if (color === 'orange-light') {
            // Spezielle Behandlung für Award-Ribbon (Stern gelb)
            if (iconPath.includes('award-ribbon-star')) {
                processedSVG = this.applyOrangeLightColorsWithYellowStar(svgContent);
            } else {
                processedSVG = this.applyOrangeLightColors(svgContent);
            }
        } else {
            // Für andere Farben: Entferne vorhandene Farb-Attribute
            processedSVG = svgContent
                .replace(/stroke="#[^"]*"/g, '')
                .replace(/fill="#[^"]*"/g, '');
        }

        iconContainer.innerHTML = processedSVG;
        return iconContainer;
    }

    /**
     * Wendet helle Orange-Farben auf ein SVG an (normale Icons)
     */
    applyOrangeLightColors(svgContent) {
        return svgContent
            // Hauptfarbe: Helles Orange
            .replace(/fill="#b2f0ff"/g, 'fill="#FACF8A"')
            .replace(/fill="#66e1ff"/g, 'fill="#FACF8A"')
            .replace(/fill="#e3e3e3"/g, 'fill="#FACF8A"')
            .replace(/fill="#78eb7b"/g, 'fill="#FACF8A"')
            .replace(/fill="#ff808c"/g, 'fill="#FACF8A"')
            .replace(/fill="#ffef5e"/g, 'fill="#FACF8A"')
            // Sekundärfarbe: Dunkles Orange für weiße Bereiche
            .replace(/fill="#ffffff"/g, 'fill="#F8B64A"')
            .replace(/fill="#fff9bf"/g, 'fill="#F8B64A"')
            // Stroke: Grauton und dünner
            .replace(/stroke="#191919"/g, 'stroke="#6b7280"')
            .replace(/stroke-width="1"/g, 'stroke-width="0.8"');
    }

    /**
     * Wendet helle Orange-Farben mit gelbem Stern auf Award-Ribbon an
     */
    applyOrangeLightColorsWithYellowStar(svgContent) {
        return svgContent
            // Hauptfarbe: Helles Orange
            .replace(/fill="#b2f0ff"/g, 'fill="#FACF8A"')
            .replace(/fill="#66e1ff"/g, 'fill="#FACF8A"')
            .replace(/fill="#e3e3e3"/g, 'fill="#FACF8A"')
            .replace(/fill="#78eb7b"/g, 'fill="#FACF8A"')
            .replace(/fill="#ff808c"/g, 'fill="#FACF8A"')
            .replace(/fill="#ffef5e"/g, 'fill="#FACF8A"')
            // Stern gelb machen - NUR für Award-Ribbon!
            .replace(/fill="#ffffff"/g, 'fill="#FFD700"')
            .replace(/fill="#fff9bf"/g, 'fill="#F8B64A"')
            // Stroke: Grauton und dünner
            .replace(/stroke="#191919"/g, 'stroke="#6b7280"')
            .replace(/stroke-width="1"/g, 'stroke-width="0.8"');
    }


    /**
     * Ersetzt ein Element durch ein Icon
     */
    async replaceWithIcon(element, iconPath, options = {}) {
        const icon = await this.createIcon(iconPath, options);
        if (icon && element.parentNode) {
            element.parentNode.replaceChild(icon, element);
        }
    }

    /**
     * Fügt ein Icon vor einem Element ein
     */
    async insertIconBefore(element, iconPath, options = {}) {
        const icon = await this.createIcon(iconPath, options);
        if (icon && element.parentNode) {
            element.parentNode.insertBefore(icon, element);
        }
    }
}

// Globale Icon-Manager Instanz
window.iconManager = new IconManager();

/**
 * Hilfsfunktionen für einfache Verwendung
 */

// Schnelle Icon-Erstellung
window.createIcon = async (iconPath, options = {}) => {
    return await window.iconManager.createIcon(iconPath, options);
};

// Icon in Element einfügen
window.insertIcon = async (selector, iconPath, options = {}) => {
    const element = document.querySelector(selector);
    if (element) {
        const icon = await window.iconManager.createIcon(iconPath, options);
        if (icon) {
            element.appendChild(icon);
        }
    }
};

/**
 * Automatisches Ersetzen von Icons basierend auf data-icon Attributen
 */
document.addEventListener('DOMContentLoaded', async () => {
    const elementsWithIcons = document.querySelectorAll('[data-icon]');
    
    for (const element of elementsWithIcons) {
        const iconPath = element.getAttribute('data-icon');
        const size = element.getAttribute('data-icon-size') || 'md';
        const color = element.getAttribute('data-icon-color') || 'primary';
        const hoverColor = element.getAttribute('data-icon-hover');
        const className = element.getAttribute('data-icon-class') || '';

        const options = { size, color, className };
        if (hoverColor) options.hoverColor = hoverColor;

        await window.iconManager.replaceWithIcon(element, iconPath, options);
    }
});

// Beispiel-Verwendung für häufig genutzte Icons
window.commonIcons = {
    // Interface Essential
    home: 'interface-essential/house-4.svg',
    settings: 'interface-essential/cog.svg',
    search: 'interface-essential/search-circle.svg',
    calendar: 'interface-essential/calendar-1.svg',
    check: 'interface-essential/check.svg',
    delete: 'interface-essential/delete.svg',
    edit: 'interface-essential/pencil-1.svg',
    info: 'interface-essential/information-circle.svg',
    
    // Arrows & Diagrams
    arrowUp: 'arrows-diagrams/arrow-thick-up-4.svg',
    arrowRight: 'arrows-diagrams/arrow-thick-right-bottom-corner-3.svg',
    
    // Business & Products
    // (füge hier weitere Icons hinzu basierend auf deinen Bedürfnissen)
};
