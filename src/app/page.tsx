"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useShowStore from "@/store/shows";
import styles from "../styles/search.module.scss";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, setSearchResults } = useShowStore();
  const router = useRouter();

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
    <main className={styles.searchContainer}>
      <form onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search TV shows..."
        />
      </form>

      <div className={styles.showGrid}>
        {searchResults.map(({ show }) => (
          <div
            key={show.id}
            className={styles.showCard}
            onClick={() => router.push(`/show/${show.id}`)}
          >
            {show.image && (
              <Image
                src={show.image.medium}
                alt={show.name}
                width={250}
                height={350}
              />
            )}
            <h2>{show.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
