import React, { useState } from "react";
import SearchBar from "../Components/Search/SearchBar";
import searchService from "../Services/search.service";
import DisplaySearchUser from "../Components/Search/DisplaySearchUser";
import { Card } from "@mui/material";
import "./searchpages.css";

function SearchUserPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      console.log(`Sending search request for query: ${query}`);
      const results = await searchService.searchUsers(query);
      console.log("Search results received:", results);
      setUsers(results);
      setError(null);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch search results. Please try again.");
      setUsers([]);
    }
  };

  return (
    <div>
      <Card
        className="search-card"
        variant="outlined"
        sx={{ backgroundColor: "background.paper" }}
      >
        <h1>Search Users</h1>
        <SearchBar onSearch={handleSearch} />
        <DisplaySearchUser users={users} error={error} />
      </Card>
    </div>
  );
}

export default SearchUserPage;
