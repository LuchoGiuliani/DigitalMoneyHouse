import { useState, ChangeEvent } from "react";

export function useSimpleFilter(list, filterKey) {
  const [searchInput, setSearchInput] = useState("");

 
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };


  const filteredList = list.filter((item) =>
    String(item[filterKey])
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  return {
    filteredList,
    searchInput,
    handleSearchInputChange,
  };
}
