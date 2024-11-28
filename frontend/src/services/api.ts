import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Centralized error handling for API calls
const handleApiError = (error: any) => {
  console.error("API Error:", error?.response?.data || error.message);
  return Promise.reject(error.response?.data?.message || "An unexpected error occurred.");
};

/**
 * Shopping List APIs
 */
export const getShoppingLists = () =>
  api.get("/shoppingLists").catch(handleApiError);

export const getShoppingListById = (id: string) =>
  api.get(`/shoppingLists/${id}`).catch(handleApiError);

export const createShoppingList = (data: { name: string; description: string }) =>
  api.post("/shoppingLists", data).catch(handleApiError);

export const updateShoppingList = (
  id: string,
  data: { name?: string; description?: string }
) => api.put(`/shoppingLists/${id}`, data).catch(handleApiError);

export const deleteShoppingList = (id: string) =>
  api.delete(`/shoppingLists/${id}`).catch(handleApiError);

/**
 * Item APIs
 */
export const addItemToShoppingList = (
  id: string,
  data: { name: string; description: string; quantity: number; isPurchased?: boolean }
) => api.post(`/shoppingLists/${id}/items`, data).catch(handleApiError);

export const updateItem = (
  itemId: string,
  data: { name?: string; description?: string; quantity?: number; isPurchased?: boolean }
) => api.put(`/items/${itemId}`, data).catch(handleApiError);

export const removeItemFromShoppingList = (id: string, itemId: string) =>
  api.delete(`/shoppingLists/${id}/items/${itemId}`).catch(handleApiError);

/**
 * Search APIs
 */
// Search shopping lists by query in name or description
export const searchShoppingLists = (query: string) =>
  api.get(`/shoppingLists/search`, { params: { query } }).catch(handleApiError);

// Search shopping lists that include a specific item
export const getShoppingListsByItemName = (itemName: string) =>
  api.get(`/shoppingLists/itemByName/${itemName}`).catch(handleApiError);

/**
 * Statistics APIs
 */
export const getStatistics = () =>
  api.get("/shoppingLists/statistics").catch(handleApiError);

export default api;
