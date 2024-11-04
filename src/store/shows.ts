import { create } from "zustand";

const useShowStore = create((set, get) => ({
  searchResults: [],
  currentShow: null,
  episodes: [],
  setSearchResults: (results) => set({ searchResults: results }),
  setCurrentShow: (show) => set({ currentShow: show }),
  setEpisodes: (episodes) => set({ episodes: episodes }),
  clearShow: () => set({ currentShow: null, episodes: [] }),
}));

export default useShowStore;
