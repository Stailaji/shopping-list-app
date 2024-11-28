# Shopping List Backend

## Inhaltsverzeichnis
1. [Projektbeschreibung](#projektbeschreibung)
2. [Verwendete Technologien](#verwendete-technologien)
3. [Struktur der Routen](#struktur-der-routen)
4. [Setup-Anleitung](#setup-anleitung)
5. [Testen der API](#testen-der-api)

---

## Projektbeschreibung
Das Backend der Shopping-List-Anwendung stellt eine RESTful API bereit, um Einkaufslisten und Artikel zu verwalten. Es bietet CRUD-Funktionalitäten und unterstützt erweiterte Such- und Statistikoperationen.

---

## Verwendete Technologien
- **Node.js**: JavaScript-Laufzeitumgebung für die Serverlogik.
- **Express.js**: Webframework zur Implementierung von API-Endpunkten.
- **MongoDB**: Datenbank zum Speichern von Einkaufslisten und Artikeln.
- **Mongoose**: ODM (Object Data Modeling) für die Interaktion mit MongoDB.
- **TypeScript**: Statische Typisierung für bessere Codequalität.
- **Axios**: HTTP-Client für API-Tests.
- **Nodemon**: Automatische Serverneustarts bei Änderungen im Code.

---

## Struktur der Routen

### Einkaufslisten-Routen
| **Route**                       | **Methode** | **Beschreibung**                                         |
|----------------------------------|-------------|---------------------------------------------------------|
| `/shoppingLists`                | GET         | Ruft alle Einkaufslisten ab.                            |
| `/shoppingLists/:id`            | GET         | Ruft eine spezifische Einkaufsliste anhand ihrer ID ab. |
| `/shoppingLists`                | POST        | Erstellt eine neue Einkaufsliste mit Namen und Beschreibung. |
| `/shoppingLists/:id`            | PUT         | Aktualisiert den Namen und die Beschreibung einer Einkaufsliste. |
| `/shoppingLists/:id`            | DELETE      | Löscht eine spezifische Einkaufsliste anhand ihrer ID.  |
| `/shoppingLists/search`         | GET         | Durchsucht Einkaufslisten nach Namen oder Beschreibungen. |
| `/shoppingLists/itemByName/:itemName` | GET   | Ruft Einkaufslisten ab, die einen Artikel mit einem bestimmten Namen enthalten. |

### Artikel-Routen
| **Route**                       | **Methode** | **Beschreibung**                                         |
|----------------------------------|-------------|---------------------------------------------------------|
| `/shoppingLists/:id/items`      | POST        | Fügt einen neuen Artikel zu einer spezifischen Einkaufsliste hinzu. |
| `/items/:itemId`                | PUT         | Aktualisiert die Details eines Artikels (Name, Beschreibung, Menge, `isPurchased`). |
| `/shoppingLists/:id/items/:itemId` | DELETE   | Entfernt einen Artikel aus einer spezifischen Einkaufsliste. |

### Statistiken-Routen
| **Route**                       | **Methode** | **Beschreibung**                                         |
|----------------------------------|-------------|---------------------------------------------------------|
| `/shoppingLists/statistics`     | GET         | Ruft Statistiken zu allen Einkaufslisten ab, einschließlich Prozentsatz gekaufter Artikel. |

---

## Setup-Anleitung

### Voraussetzungen
1. **Node.js**: Version 16.x oder höher.
2. **MongoDB**: Lokale oder cloudbasierte Datenbank.

### Schritte

1. Installieren Sie die Abhängigkeiten:
```bash
   npm install
```

2. Starten Sie den Server:

```bash
npm start
```

## Testen der API

### Automatisiertes Testen 
Ein Testskript (testAll.js) befindet sich im Verzeichnis src/tests. Dieses Skript überprüft alle wichtigen Funktionen des Backends, darunter:

- Erstelle eine Einkaufsliste: Erstellt eine neue Einkaufsliste und überprüft die Rückgabe.
- Abrufen aller Einkaufslisten: Ruft alle Einkaufslisten ab und überprüft, ob die Rückgabe korrekt ist.
- Aktualisiere eine Einkaufsliste: Ändert den Namen einer Einkaufsliste und prüft die Aktualisierung.
- Füge einen Artikel hinzu: Fügt einen Artikel zu einer Liste hinzu und überprüft, ob der -Artikel korrekt gespeichert wurde.
- Aktualisiere einen Artikel: Ändert die Menge eines Artikels und prüft die Aktualisierung.
- Abrufen der Einkaufslisten-Statistik: Holt die Statistik der Einkaufslisten (Prozentsatz gekaufter Artikel).
- Lösche einen Artikel: Entfernt einen Artikel aus einer Liste und überprüft den Erfolg.
- Lösche eine Einkaufsliste: Entfernt eine Einkaufsliste vollständig.

### Tests ausführen

1. Server starten: 

```bash
npm start
```

2. Testskript ausführen:

```bash
cd src/tests
node testAll.js
```

