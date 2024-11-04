import { create } from "zustand";
import type { Show, Episode, SearchResult } from "@/types/tvmaze";

interface ShowStore {
  searchResults: SearchResult[];
  currentShow: Show | null;
  episodes: Episode[];
  setSearchResults: (results: SearchResult[]) => void;
  setCurrentShow: (show: Show) => void;
  setEpisodes: (episodes: Episode[]) => void;
  clearShow: () => void;
}

const useShowStore = create<ShowStore>((set) => ({
  searchResults: [],
  currentShow: null,
  episodes: [],
  setSearchResults: (results) => set({ searchResults: results }),
  setCurrentShow: (show) => set({ currentShow: show }),
  setEpisodes: (episodes) => set({ episodes: episodes }),
  clearShow: () => set({ currentShow: null, episodes: [] }),
}));

export default useShowStore;
