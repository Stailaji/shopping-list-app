import { Input } from "@chakra-ui/react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search..." }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Input
      placeholder={placeholder}
      onChange={handleInputChange}
      borderRadius="full"
      borderColor="gray.300"
    />
  );
};

export default SearchBar;
