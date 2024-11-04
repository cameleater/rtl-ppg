export interface Show {
  id: number;
  name: string;
  summary: string;
  image?: {
    medium: string;
    original: string;
  };
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  summary: string;
  image?: {
    medium: string;
    original: string;
  };
}

export interface SearchResult {
  score: number;
  show: Show;
}
