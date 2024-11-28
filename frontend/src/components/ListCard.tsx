import React from "react";
import { Box, Flex, Text, CircularProgress, CircularProgressLabel, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface ListCardProps {
  id: string;
  name: string;
  description: string;
  date: string;
  itemCount: number;
  purchasedPercentage: number;
  onOpenDetails: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, currentName: string, currentDescription: string) => void; // New prop for editing
}

const ListCard: React.FC<ListCardProps> = ({
  id,
  name,
  description,
  date,
  purchasedPercentage,
  onOpenDetails,
  onDelete,
  onEdit, // Destructure the new prop
}) => {
  return (
    <Flex
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      justify="space-between"
      align="center"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
      onClick={() => onOpenDetails(id)}
    >
      <CircularProgress value={purchasedPercentage} size="50px" color="teal.400">
        <CircularProgressLabel>{Math.round(purchasedPercentage)}%</CircularProgressLabel>
      </CircularProgress>

      <Box flex="1" mx={4}>
        <Flex align="center" justify="space-between">
          <Text fontWeight="bold">{name}</Text>
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit List"
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening list details
              onEdit(id, name, description); // Trigger the edit action
            }}
            colorScheme="yellow"
          />
        </Flex>
        <Text fontSize="sm" color="gray.500">{description}</Text>
        <Text fontSize="xs" color="gray.400">Created on: {new Date(date).toLocaleDateString()}</Text>
      </Box>

      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete List"
        colorScheme="red"
        onClick={(e) => {
          e.stopPropagation(); // Prevent opening details on delete
          onDelete(id);
        }}
      />
    </Flex>
  );
};

export default ListCard;
