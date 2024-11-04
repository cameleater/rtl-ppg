import { create } from "zustand";

const useShowStore = create((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
  clearResults: () => set({ searchResults: [] }),
}));

export default useShowStore;
