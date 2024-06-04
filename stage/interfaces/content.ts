export enum ContentType {
  MOVIE = 'movie',
  TV_SHOW = 'tv_show'
}

export interface ContentAddRequestPayload {
  contentType: ContentType;
  contentId: number;
}