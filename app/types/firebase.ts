export interface Episode {
  id: number;
  duration: string;
  description: string;
  title: string;
  thumbnail: string;
}
export interface Show {
  cast: string;
  categoryIds: string[];
  description: string;
  dislikes: number;
  likes: number;
  match: string;
  seasons: number;
  thumbnail: string;
  title: string;
  year: number;
  id: number;
  url: string;
}
export interface Category {
  name: string;
  id: number;
}
