export interface Game {
  id: string;
  slug: string;
  title: string;
  icon?: string;
  thumbnail: string;
  previewVideoURL?: string;
  category: string;
  rating: number;
  playersCount: string;
  description: string;
  embedUrl: string;
}

export type Category = {
  id: string;
  name: string;
  icon?: string;
  color: string;
};
