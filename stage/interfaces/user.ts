import {
  Genre,
} from '@interfaces/common';

export interface ContentInfo {
  contentId: string;
  watchedOn: string;
  rating?: number;
}

export interface User {
  id: number;
  auth0Id: string;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: ContentInfo[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserUpdateInfo {
  watchHistory: ContentInfo[];
}
