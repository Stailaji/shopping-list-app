import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteShoppingList } from "../services/api";

const DeleteShoppingListButton = ({ id, onListDeleted }: { id: string; onListDeleted: () => void }) => {
  const handleDelete = async () => {
    try {
      await deleteShoppingList(id);
      alert("Einkaufsliste gelöscht!");
      onListDeleted();
    } catch (error) {
      console.error(error);
      alert("Fehler beim Löschen der Einkaufsliste.");
    }
  };

  return (
    <IconButton
      icon={<DeleteIcon />}
      onClick={handleDelete}
      aria-label="Delete List"
      variant="ghost"
      colorScheme="red"
    />
  );
};

export default DeleteShoppingListButton;
