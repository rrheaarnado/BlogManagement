import React, { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi"; // Using react-icons for simplicity

const FloatingBottomBar = ({ onAdd, onSearch }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim() !== "") {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black shadow-xl rounded-full flex items-center gap-2 px-4 py-2">
    
      {/* Search Button */}
      <button
        onClick={() => onSearch(value)}
        className="flex items-center justify-center gap-1 text-white p-2 rounded-full hover:bg-gray-500 hover:text-white"
      >
        <FiSearch className="w-5 h-5" /> Search
      </button>
      
      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="flex items-center justify-center gap-1 text-white p-2 rounded-full hover:bg-gray-500 hover:text-white"
      > 
        <FiPlus className="w-5 h-5" /> Add Post
      </button>


    </div>
  );
};

export default FloatingBottomBar;
