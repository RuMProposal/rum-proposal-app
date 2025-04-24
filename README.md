# RuM Project Proposal Generator

Eine moderne Web-Anwendung zur Erstellung professioneller Angebote im Corporate Design von RuM Project.

## Funktionen

- Mehrsprachigkeit (Deutsch/Englisch)
- Vorkonfigurierbare Textvorlagen für alle Sektionen
- Hintergrundauswahl mit Transparenzeinstellungen
- Autofill-Funktionalität für häufig verwendete Daten
- Zuverlässiger PDF-Export des gesamten Proposals
- Link-Sharing für die Zusammenarbeit

## Sektionen

- Titelseite mit Logo-Upload
- Unternehmensvorstellung
- Zahlen & Fakten
- Dienstleistungen
- Qualitätsmanagement
- Projektteam
- Projektabwicklung
- Bauzeitenplan
- Baustellenlogistik
- Arbeitssicherheit
- Angebot
- Referenzen

## Installation und Entwicklung

### Voraussetzungen

- Node.js 18 oder höher
- npm 9 oder höher

### Entwicklung

1. Repository klonen
   ```
   git clone https://github.com/username/rum-proposal-app.git
   cd rum-proposal-app
   ```

2. Abhängigkeiten installieren
   ```
   npm install
   ```

3. Entwicklungsserver starten
   ```
   npm run dev
   ```

4. Anwendung für Produktion bauen
   ```
   npm run build
   ```

## Anpassung

Die Anwendung kann leicht an spezifische Anforderungen angepasst werden:

- Textvorlagen: Bearbeiten Sie die Vorlagen in `src/contexts/LanguageContext.jsx`
- Hintergrundbilder: Fügen Sie neue Bilder im Verzeichnis `public/assets/backgrounds/` hinzu
- Farben und Design: Passen Sie die Farbvariablen in `tailwind.config.js` an

## Lizenz

Dieses Projekt ist urheberrechtlich geschützt und Eigentum von RuM Project GmbH.

## Kontakt

Bei Fragen oder Anregungen wenden Sie sich bitte an [info@rumproject.de](mailto:info@rumproject.de) oder besuchen Sie [www.rumproject.de](https://www.rumproject.de).
