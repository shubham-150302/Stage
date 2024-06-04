
import { ContentType } from '@interfaces/content';
import BaseRepository from './base';
import { PaginatedItemsResponse } from '@interfaces/common';

export default class UserWatchlistRepository extends BaseRepository {
  async findUserWatchListByContentTypeAndContentId<T>({
    userId,
    contentType,
    contentId,
  }: {
    userId: string;
    contentType: ContentType;
    contentId: number;
  }): Promise<T[]> {
    const { UserWatchlistModel } = this.server.models();
    const query = UserWatchlistModel.query();

    query.where('fk_user', userId);

    if (contentType === ContentType.MOVIE) {
      query.where('fk_movie', contentId);
    } else if (contentType === ContentType.TV_SHOW) {
      query.where('fk_tv_show', contentId);
    }

    return query.castTo<T[]>();
  }

  async findByUserId<T>({
    userId,
    page = 0,
    limit = 10,
  }: {
    userId: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedItemsResponse<T>> {
    const { UserWatchlistModel } = this.server.models();
    const query = UserWatchlistModel.query();

    query.where('fk_user', userId);
    query.havingNull('removed_at');
    return query.page(page, limit).castTo<PaginatedItemsResponse<T>>();
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    userWatchlistRepository: UserWatchlistRepository;
  }
}
