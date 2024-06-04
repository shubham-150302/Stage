import { Genre } from '@interfaces/common';

export interface TVShowEpisode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: string;
  director: string;
  actors: string[];
}

export interface TVShow {
  id: number;
  title: string;
  description: string;
  genres: Genre[];
  episodes: TVShowEpisode[];
  createdAt?: string;
  updatedAt?: string;
}
