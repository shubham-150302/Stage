export interface UserWatchlist {
  id?: number;
  fkUser: number;
  fkMovie?: number;
  fkTvShow?: number;
  removedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserWatchlistUpdateInfo {
  removedAt: string;
}