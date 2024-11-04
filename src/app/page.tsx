"use client";

import { useState } from "react";
import useShowStore from "@/store/shows";
import styles from "./page.module.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, setSearchResults } = useShowStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search TV shows..."
        />
        <button type="submit">Search</button>
      </form>

      <div className={styles.grid}>
        {searchResults.map(({ show }) => (
          <div key={show.id} className={styles.card}>
            {show.image && <img src={show.image.medium} alt={show.name} />}
            <h2>{show.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
