import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { updateShoppingList } from "../services/api";

const EditShoppingListModal = ({
  id,
  currentName,
  currentDescription,
  isOpen,
  onClose,
  onListUpdated,
}: {
  id: string;
  currentName: string;
  currentDescription: string;
  isOpen: boolean;
  onClose: () => void;
  onListUpdated: () => void;
}) => {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);

  const handleSubmit = async () => {
    try {
      await updateShoppingList(id, { name, description });
      onListUpdated();
      onClose();
    } catch (error) {
      alert("Failed to update the list.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Shopping List</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={2}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="teal">
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditShoppingListModal;
