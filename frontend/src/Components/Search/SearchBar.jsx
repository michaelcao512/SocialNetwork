import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchBar({ onSearch, searchLabel }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" gap={2} marginBottom={2}>
      <TextField
        label={`Search ${searchLabel}`}
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
