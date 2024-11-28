import { useEffect, useState } from "react";
import { Box, Heading, Flex, Text, Center, Spinner, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import ModalItemList from "../components/ModalItemList";
import CreateShoppingList from "../components/CreateShoppingList";
import EditShoppingListModal from "../components/EditShoppingListModal";
import {
  getShoppingLists,
  getStatistics,
  deleteShoppingList,
  getShoppingListsByItemName,
} from "../services/api";

const Dashboard = () => {
  const [shoppingLists, setShoppingLists] = useState<any[]>([]);
  const [filteredLists, setFilteredLists] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<any | null>(null);
  const [statistics, setStatistics] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch lists and statistics
  const fetchData = async () => {
    try {
      setLoading(true);
      const [listResponse, statsResponse] = await Promise.all([
        getShoppingLists(),
        getStatistics(),
      ]);
      setShoppingLists(listResponse.data.data);
      setFilteredLists(listResponse.data.data);
      setStatistics(statsResponse.data.data);
    } catch (error) {
      setError("Failed to load shopping lists. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search functionality by list name or description
  const handleSearchByListDetails = (query: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = shoppingLists.filter((list) =>
      list.name.toLowerCase().includes(normalizedQuery) ||
      list.description.toLowerCase().includes(normalizedQuery)
    );
    setFilteredLists(filtered);
  };

  // Search functionality by item name
  const handleSearchByItemName = async (itemName: string) => {
    if (!itemName.trim()) {
      setFilteredLists(shoppingLists);
      return;
    }

    try {
      const response = await getShoppingListsByItemName(itemName.trim().toLowerCase());
      setFilteredLists(response.data.data);
    } catch (error) {
      setFilteredLists([]); // Set filteredLists to an empty array if no lists are found
    }
  };

  // Delete a shopping list
  const handleDeleteList = async (id: string) => {
    try {
      await deleteShoppingList(id);
      alert("Shopping list deleted successfully!");
      fetchData();
    } catch {
      alert("Failed to delete the shopping list.");
    }
  };

  // Open details for a selected shopping list
  const openListDetails = (id: string) => {
    const list = shoppingLists.find((list) => list._id === id);
    setSelectedList(list);
    setModalOpen(true);
  };

  // Close modal for shopping list details
  const closeModal = () => {
    setSelectedList(null);
    setModalOpen(false);
  };

  // Open edit modal for a shopping list
  const handleEditList = (id: string, currentName: string, currentDescription: string) => {
    setEditingList({ id, name: currentName, description: currentDescription });
    setEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingList(null);
    setEditModalOpen(false);
  };

  // Refresh data after updating a list
  const handleUpdateList = async () => {
    fetchData();
    closeEditModal();
  };

  return (
    <Box p={6} bg="gray.50" minHeight="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="lg" color="teal.600">
          ✨ Your Shopping Lists 🛒
        </Heading>
        <IconButton
          icon={<AddIcon />}
          onClick={() => setCreateModalOpen(true)}
          aria-label="Add Shopping List"
          bg="teal.600"
          color="white"
          _hover={{ bg: "teal.700" }}
        />
      </Flex>

      <Flex gap={4} mb={6}>
        <SearchBar
          onSearch={handleSearchByListDetails}
          placeholder="Search by list name/description..."
        />
        <SearchBar onSearch={handleSearchByItemName} placeholder="Search by item name..." />
      </Flex>

      {error && (
        <Text color="red.500" mb={4} textAlign="center" fontWeight="bold">
          {error}
        </Text>
      )}

      {loading ? (
        <Center>
          <Spinner size="xl" color="teal.600" />
        </Center>
      ) : filteredLists.length > 0 ? (
        <Flex direction="column" gap={6}>
          {filteredLists.map((list) => {
            const stat = statistics.find((s) => s.listId === list._id);
            return (
              <ListCard
                key={list._id}
                id={list._id}
                name={list.name}
                description={list.description}
                date={list.createdAt}
                itemCount={list.items.length}
                purchasedPercentage={stat?.purchasedPercentage || 0}
                onOpenDetails={openListDetails}
                onDelete={handleDeleteList}
                onEdit={handleEditList} // Pass edit functionality
              />
            );
          })}
        </Flex>
      ) : (
        <Center>
          <Text fontSize="lg" color="gray.500" textAlign="center">
            No matching shopping lists found. Try adjusting your search. 🛍️
          </Text>
        </Center>
      )}

      {selectedList && (
        <ModalItemList
          isOpen={isModalOpen}
          onClose={closeModal}
          items={selectedList.items}
          listName={selectedList.name}
          listId={selectedList._id}
          onItemsUpdated={fetchData}
        />
      )}

      {isCreateModalOpen && (
        <CreateShoppingList
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onListCreated={fetchData}
        />
      )}

      {editingList && (
        <EditShoppingListModal
          id={editingList.id}
          currentName={editingList.name}
          currentDescription={editingList.description}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onListUpdated={handleUpdateList}
        />
      )}
    </Box>
  );
};

export default Dashboard;
