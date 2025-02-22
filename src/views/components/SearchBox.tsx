import React, { useState } from "react";
import { useSearchTasks } from "../../providers/app_commons";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBoxProps {
}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { mutate: searchtasks } = useSearchTasks();

  const handleSearch = () => {
    searchtasks(searchTerm);
  };

  return (
    <div className="w-full max-w-md mx-auto flex gap-2 " >
      <input
        type="text"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search tasks..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="p-3 rounded-md text-center bg-blue-400 text-white" onClick={handleSearch}>
        <SearchOutlined />
      </div>
    </div>
  );
};

export default SearchBox;
