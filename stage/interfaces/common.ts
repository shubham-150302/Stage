export enum RequestHeaders {
  LOCALE = 'locale',
}

export enum SupportedLanguage {
  EN = 'en',
}

export type Genre = 'Action' | 'Comedy' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

export type PaginatedItemsResponse<T> = {
  results: T[];
  total: number;
};