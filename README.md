# Shopping List Application

## Inhaltsverzeichnis

1. [Projektbeschreibung](#projektbeschreibung)
2. [Voraussetzungen](#voraussetzungen)
3. [Setup-Anleitung](#setup-anleitung)
4. [Frontend starten](#frontend-starten)
5. [Backend starten](#backend-starten)
6. [Testen der Anwendung](#testen-der-anwendung)

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
3. **MongoDB Atlas** (Die Verbindung ist bereits in der `.env`-Datei definiert : 
PORT=4000
MONGO_URL=mongodb+srv://aialajimi:MyDatabase@cluster0.sfmyg.mongodb.net/node-typescript-app?retryWrites=true&w=majority
)

Die Anwendung ist so konfiguriert, dass sie automatisch die bereitgestellte MongoDB-Datenbank nutzt.

- **Datenbank-Verbindung:** In der `.env`-Datei enthalten.
- **Wichtige Anmerkung:** Diese Zugangsdaten sind ausschließlich für Testzwecke gedacht. Die Datenbank wird nach der Bewertung entfernt.

Falls Sie eine eigene MongoDB-Datenbank verwenden möchten:
1. Erstellen Sie eine neue Datenbank in MongoDB Atlas oder lokal.
2. Aktualisieren Sie die `MONGO_URL` in der `.env`-Datei entsprechend.
3. Starten Sie die Anwendung neu.

---

### Bereitgestellte Zugangsdaten:
- URL: `mongodb+srv://aialajimi:MyDatabase@cluster0.sfmyg.mongodb.net/node-typescript-app?retryWrites=true&w=majority`
- Sie können die bereitgestellte Datenbank für Ihre Tests verwenden.
---

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
cd Frontend
npm install
npm run dev
```
- Öffnen Sie die Anwendung im Browser:

http://localhost:5173





