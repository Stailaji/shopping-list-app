# Shopping List Application

## Inhaltsverzeichnis

1. [Projektbeschreibung](#projektbeschreibung)
2. [Voraussetzungen](#voraussetzungen)
3. [Setup-Anleitung](#setup-anleitung)


---

## Projektbeschreibung

Die Shopping List Application ist eine Webanwendung, die es Benutzern ermöglicht:
- Einkaufslisten zu erstellen, zu bearbeiten und zu löschen.
- Artikel zu den Einkaufslisten hinzuzufügen, zu aktualisieren und zu löschen.
- Einkaufslisten nach Namen, Beschreibung oder enthaltenen Artikeln zu durchsuchen.
- Den Prozentsatz der gekauften Artikel anzuzeigen.

Die Anwendung besteht aus zwei Teilen:
1. **Frontend**: React-Anwendung mit Chakra UI zur Benutzeroberfläche.
2. **Backend**: Node.js-Server mit Express und MongoDB zur Verwaltung der API-Endpunkte.

---

## Voraussetzungen

1. **Node.js** (Version 16.x oder höher)
2. **npm** (im Lieferumfang von Node.js enthalten)
3. **MongoDB Atlas** 


## Datenbank einrichten

Diese Anwendung enthält keine vordefinierte Datenbankverbindung. Daher muss eine eigene MongoDB-Datenbank erstellt und in einer `.env`-Datei konfiguriert werden.

### 1. Eigene `.env`-Datei erstellen

Da die `.env`-Datei aus Sicherheitsgründen nicht im Repository enthalten ist, muss sie manuell erstellt werden.

1. Im `Backend`-Ordner eine Datei mit dem Namen `.env` erstellen.
2. Folgenden Inhalt hinzufügen und die Platzhalter durch die eigenen Verbindungsdaten ersetzen:

PORT=4000 
MONGO_URL=

## Setup-Anleitung

### 1. Navigieren Sie in das Backend-Verzeichnis:
```bash
cd Backend
npm install
npm start
```
- Das Backend wird auf folgendem Link verfügbar sein:

http://localhost:4000/api


### 2. Navigieren Sie in das Frontend-Verzeichnis:
```bash
cd frontend
npm install
npm run dev
```
- Öffnen Sie die Anwendung im Browser:

http://localhost:5173





