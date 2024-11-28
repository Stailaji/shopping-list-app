import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { createShoppingList } from "../services/api";

interface CreateShoppingListProps {
  isOpen: boolean;
  onClose: () => void;
  onListCreated: () => void;
}

const CreateShoppingList: React.FC<CreateShoppingListProps> = ({ isOpen, onClose, onListCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Input validation
  const validateInputs = () => {
    if (!name.trim() || !description.trim()) {
      setError("Name and description are required!");
      return false;
    }
    setError(null);
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      await createShoppingList({ name: name.trim(), description: description.trim() });
      alert("Shopping list created successfully!");
      setName("");
      setDescription("");
      onListCreated();
      onClose();
    } catch (error) {
      setError("Failed to create the shopping list. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Shopping List</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Shopping List Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="teal">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateShoppingList;
