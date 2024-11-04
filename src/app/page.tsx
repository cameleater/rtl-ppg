"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useShowStore from "@/store/shows";
import Image from "next/image";
import type { SearchResult } from "@/types/tvmaze";
import styles from "@/styles/search.module.scss";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, setSearchResults } = useShowStore();
  const router = useRouter();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data: SearchResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <h1>ShowMe</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className={styles.searchInput}
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
            <h3>{show.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
