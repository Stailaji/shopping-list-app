import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Text,
  Stack,
  Flex,
  Input,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { addItemToShoppingList, updateItem, removeItemFromShoppingList } from "../services/api";

interface ModalItemListProps {
  isOpen: boolean;
  onClose: () => void;
  items: {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    isPurchased: boolean;
  }[];
  listName: string;
  listId: string;
  onItemsUpdated: () => void;
}

const ModalItemList: React.FC<ModalItemListProps> = ({
  isOpen,
  onClose,
  items,
  listName,
  listId,
  onItemsUpdated,
}) => {
  const [localItems, setLocalItems] = useState([...items]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: 1,
    isPurchased: false,
  });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalItems([...items]);
  }, [items]);

  const handleAddItem = async () => {
    if (!newItem.name.trim() || !newItem.description.trim()) {
      setError("Name and description are required.");
      return;
    }

    setError(null);
    try {
      const response = await addItemToShoppingList(listId, {
        ...newItem,
        name: newItem.name.trim(),
        description: newItem.description.trim(),
      });
      setLocalItems((prevItems) => [...prevItems, response.data.data]);
      setNewItem({ name: "", description: "", quantity: 1, isPurchased: false });
      onItemsUpdated();
    } catch (error) {
      setError("Failed to add the item. Please try again.");
    }
  };

  const handleUpdateItem = async (itemId: string, changes: Partial<typeof newItem>) => {
    const updatedItem = localItems.find((item) => item._id === itemId);
    if (!updatedItem) return;

    const newValues = { ...updatedItem, ...changes };

    try {
      await updateItem(itemId, newValues);
      setLocalItems((prevItems) =>
        prevItems.map((item) => (item._id === itemId ? newValues : item))
      );
      onItemsUpdated();
      setEditingItemId(null);
    } catch (error) {
      setError("Failed to update the item. Please try again.");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await removeItemFromShoppingList(listId, itemId);
      setLocalItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      onItemsUpdated();
    } catch (error) {
      setError("Failed to delete the item.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Items for List:{" "}
          <Text as="span" fontWeight="bold" color="teal.600">
            {listName}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {localItems.map((item) => (
              <Box key={item._id} p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                <Flex justify="space-between" align="center">
                  <Box>
                    {editingItemId === item._id ? (
                      <>
                        <Input
                          value={item.name}
                          onChange={(e) =>
                            setLocalItems((prevItems) =>
                              prevItems.map((prevItem) =>
                                prevItem._id === item._id
                                  ? { ...prevItem, name: e.target.value }
                                  : prevItem
                              )
                            )
                          }
                          placeholder="Edit name"
                          mb={2}
                        />
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            setLocalItems((prevItems) =>
                              prevItems.map((prevItem) =>
                                prevItem._id === item._id
                                  ? { ...prevItem, description: e.target.value }
                                  : prevItem
                              )
                            )
                          }
                          placeholder="Edit description"
                          mb={2}
                        />
                        <Button
                          leftIcon={<CheckIcon />}
                          colorScheme="green"
                          onClick={() =>
                            handleUpdateItem(item._id, {
                              name: item.name,
                              description: item.description,
                            })
                          }
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {item.description}
                        </Text>
                        <Checkbox
                          isChecked={item.isPurchased}
                          onChange={() =>
                            handleUpdateItem(item._id, { isPurchased: !item.isPurchased })
                          }
                        >
                          Purchased
                        </Checkbox>
                      </>
                    )}
                  </Box>
                  <Flex align="center" gap={3}>
                    <IconButton
                      icon={<MinusIcon />}
                      onClick={() =>
                        handleUpdateItem(item._id, { quantity: item.quantity - 1 })
                      }
                      isDisabled={item.quantity <= 1}
                      aria-label="Decrease Quantity"
                      size="sm"
                    />
                    <Text fontSize="md">{item.quantity}</Text>
                    <IconButton
                      icon={<AddIcon />}
                      onClick={() =>
                        handleUpdateItem(item._id, { quantity: item.quantity + 1 })
                      }
                      aria-label="Increase Quantity"
                      size="sm"
                    />
                    <Tooltip label="Edit Item" placement="top">
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => setEditingItemId(item._id)}
                        aria-label="Edit Item"
                        size="sm"
                        colorScheme="yellow"
                      />
                    </Tooltip>
                    <Tooltip label="Delete Item" placement="top">
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteItem(item._id)}
                        aria-label="Delete Item"
                        size="sm"
                        colorScheme="red"
                      />
                    </Tooltip>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Stack>
          <Box mt={4}>
            <Text fontWeight="bold" mb={2}>
              Add New Item
            </Text>
            <Input
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              mb={2}
            />
            <Input
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              mb={2}
            />
            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}
            <Button onClick={handleAddItem} colorScheme="teal" mt={2}>
              Add
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalItemList;
