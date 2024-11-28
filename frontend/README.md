# Shopping List Frontend

## Inhaltsverzeichnis
1. [Projektbeschreibung](#projektbeschreibung)
2. [Funktionalitäten](#funktionalitäten)
3. [Setup-Anleitung](#setup-anleitung)


---

## Projektbeschreibung
Das Frontend der Shopping-List-Anwendung bietet eine benutzerfreundliche Oberfläche, mit der Benutzer:
- Einkaufslisten erstellen, bearbeiten und löschen können.
- Artikel zu Einkaufslisten hinzufügen, aktualisieren und löschen können.
- Einkaufslisten basierend auf Namen, Beschreibungen oder enthaltenen Artikeln durchsuchen können.
- Den Fortschritt (Prozentsatz gekaufter Artikel) anzeigen können.

Das Projekt basiert auf **React** und verwendet **Chakra UI** für die Gestaltung.

---

## Funktionalitäten

### Einkaufslisten-Management
- **Erstellen**: Neue Einkaufslisten mit Namen und Beschreibung hinzufügen.
- **Bearbeiten**: Den Namen und die Beschreibung bestehender Listen aktualisieren.
- **Löschen**: Einkaufslisten entfernen.

### Artikel-Management
- **Hinzufügen**: Artikel mit Name, Beschreibung, Menge und Status (`isPurchased`) zu Listen hinzufügen.
- **Bearbeiten**: Artikelinformationen wie Name, Beschreibung, Menge oder den `isPurchased`-Status ändern.
- **Löschen**: Artikel aus einer Einkaufsliste entfernen.

### Suche
- **Nach Listen suchen**: Listen anhand von Namen oder Beschreibungen durchsuchen.
- **Nach Artikeln suchen**: Einkaufslisten durchsuchen, die bestimmte Artikel enthalten.

### Statistiken
- Anzeige des Prozentsatzes der gekauften Artikel in einer Einkaufsliste.

---
## Verwendete Routen im Frontend

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

### Beschreibung
- Diese Routen werden im Frontend durch Axios-Aufrufe in den Service-APIs verwendet.
- Sie ermöglichen die vollständige Interaktion mit dem Backend, um Einkaufslisten und Artikel zu verwalten, zu durchsuchen und zu aktualisieren.


## Setup-Anleitung

### Voraussetzungen
1. **Node.js**: Version 16.x oder höher muss installiert sein.
2. **Package Manager**: `npm` oder `yarn`.

### Schritte

1. Installieren Sie die Abhängigkeiten:
```bash
   npm install
   # oder
   yarn install
```

2. Starten Sie die Entwicklungsumgebung:

```bash
npm start
```


3. Öffnen Sie die Anwendung im Browser:

URL: http://localhost:5173





