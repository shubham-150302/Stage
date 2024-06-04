import { Genre } from '@interfaces/common';

export interface Movie {
  id: number;
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: string;
  director: string;
  actors: string[];
  createdAt?: string;
  updatedAt?: string;
}
