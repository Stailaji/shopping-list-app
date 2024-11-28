const axios = require("axios");

const API_URL = "http://localhost:4000/api";

(async () => {
  try {
    console.log("🚀 Starting Tests...");

    // Variablen für IDs
    let shoppingListId;
    let itemId;

    // -------------------------------
    // Test 1: Erstelle eine Einkaufsliste
    // -------------------------------
    console.log("\n🔍 Test 1: Erstelle eine Einkaufsliste");
    const createListResponse = await axios.post(`${API_URL}/shoppingLists`, {
      name: "Test Shopping List",
      description: "This is a test shopping list",
    });

    if (createListResponse.status === 201) {
      console.log("✅ Einkaufsliste erfolgreich erstellt:", createListResponse.data.data);
      shoppingListId = createListResponse.data.data._id;
    } else {
      console.error("❌ Test 1 fehlgeschlagen:", createListResponse.data);
      return;
    }

    // -------------------------------
    // Test 2: Abrufen aller Einkaufslisten
    // -------------------------------
    console.log("\n🔍 Test 2: Abrufen aller Einkaufslisten");
    const getAllListsResponse = await axios.get(`${API_URL}/shoppingLists`);

    if (getAllListsResponse.status === 200) {
      console.log("✅ Erfolgreich alle Einkaufslisten abgerufen:", getAllListsResponse.data.data);
    } else {
      console.error("❌ Test 2 fehlgeschlagen:", getAllListsResponse.data);
      return;
    }

    // -------------------------------
    // Test 3: Aktualisiere die Einkaufsliste
    // -------------------------------
    console.log("\n🔍 Test 3: Aktualisiere die Einkaufsliste");
    const updateListResponse = await axios.put(`${API_URL}/shoppingLists/${shoppingListId}`, {
      name: "Updated Shopping List",
    });

    if (updateListResponse.status === 200 && updateListResponse.data.data.name === "Updated Shopping List") {
      console.log("✅ Einkaufsliste erfolgreich aktualisiert:", updateListResponse.data.data);
    } else {
      console.error("❌ Test 3 fehlgeschlagen:", updateListResponse.data);
      return;
    }

    // -------------------------------
    // Test 4: Füge einen Artikel zur Einkaufsliste hinzu
    // -------------------------------
    console.log("\n🔍 Test 4: Füge einen Artikel zur Einkaufsliste hinzu");
    const addItemResponse = await axios.post(`${API_URL}/shoppingLists/${shoppingListId}/items`, {
      name: "Test Item",
      description: "This is a test item",
      quantity: 5,
      isPurchased: false,
    });

    if (addItemResponse.status === 200) {
      console.log("✅ Artikel erfolgreich hinzugefügt:", addItemResponse.data.data);
      itemId = addItemResponse.data.data._id;
    } else {
      console.error("❌ Test 4 fehlgeschlagen:", addItemResponse.data);
      return;
    }

    // -------------------------------
    // Test 5: Aktualisiere den Artikel
    // -------------------------------
    console.log("\n🔍 Test 5: Aktualisiere den Artikel");
    const updateItemResponse = await axios.put(`${API_URL}/items/${itemId}`, {
      name: "Updated Test Item",
      quantity: 10,
    });

    if (updateItemResponse.status === 200 && updateItemResponse.data.data.quantity === 10) {
      console.log("✅ Artikel erfolgreich aktualisiert:", updateItemResponse.data.data);
    } else {
      console.error("❌ Test 5 fehlgeschlagen:", updateItemResponse.data);
      return;
    }

    // -------------------------------
    // Test 6: Abrufen der Einkaufslisten-Statistik
    // -------------------------------
    console.log("\n🔍 Test 6: Abrufen der Einkaufslisten-Statistik");
    const statisticsResponse = await axios.get(`${API_URL}/shoppingLists/statistics`);

    if (statisticsResponse.status === 200) {
      console.log("✅ Statistik erfolgreich abgerufen:", statisticsResponse.data.data);
    } else {
      console.error("❌ Test 6 fehlgeschlagen:", statisticsResponse.data);
      return;
    }

    // -------------------------------
    // Test 7: Lösche den Artikel aus der Einkaufsliste
    // -------------------------------
    console.log("\n🔍 Test 7: Lösche den Artikel aus der Einkaufsliste");
    const deleteItemResponse = await axios.delete(`${API_URL}/shoppingLists/${shoppingListId}/items/${itemId}`);

    if (deleteItemResponse.status === 200) {
      console.log("✅ Artikel erfolgreich gelöscht");
    } else {
      console.error("❌ Test 7 fehlgeschlagen:", deleteItemResponse.data);
      return;
    }

    // -------------------------------
    // Test 8: Lösche die Einkaufsliste
    // -------------------------------
    console.log("\n🔍 Test 8: Lösche die Einkaufsliste");
    const deleteListResponse = await axios.delete(`${API_URL}/shoppingLists/${shoppingListId}`);

    if (deleteListResponse.status === 200) {
      console.log("✅ Einkaufsliste erfolgreich gelöscht");
    } else {
      console.error("❌ Test 8 fehlgeschlagen:", deleteListResponse.data);
      return;
    }

    console.log("\n🎉 Alle Tests erfolgreich abgeschlossen!");
  } catch (error) {
    console.error("\n❌ Test fehlgeschlagen:", error.message);
  }
})();
