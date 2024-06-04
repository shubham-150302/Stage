import { Service } from '@hapipal/schmervice';
import { Transaction } from 'objection';
import { UserWatchlist, UserWatchlistUpdateInfo } from '@interfaces/user-watch-list';
import { ContentType } from '@interfaces/content';

export default class UserWatchlistService extends Service {
  async createUserWatchlist({ userWatchlistInfo, txn }: { userWatchlistInfo: UserWatchlist; txn?: Transaction }) {
    const { userWatchlistRepository } = this.server.services();

    return userWatchlistRepository.create<UserWatchlist>(
      'UserWatchlistModel',
      {
        ...userWatchlistInfo,
      },
      txn,
    );
  }

  async findUserWatchListByContentTypeAndContentId({
    userId,
    contentType,
    contentId,
  }: {
    userId: string;
    contentType: ContentType;
    contentId: number;
  }): Promise<UserWatchlist[]> {
    const { userWatchlistRepository } = this.server.services();
    const userWatchlist =
      await userWatchlistRepository.findUserWatchListByContentTypeAndContentId<UserWatchlist>({
        userId, contentType, contentId,
      });
    return userWatchlist;
  }

  async findByUserId({
    userId,
    page,
    limit,
  }: {
    userId: string;
    page?: number;
    limit?: number;
  }) {
    const { userWatchlistRepository } = this.server.services();
    const userWatchlist = await userWatchlistRepository.findByUserId<UserWatchlist>({ userId, page, limit });
    return userWatchlist;
  }

  async findById({ id }: { id: number }): Promise<UserWatchlist> {
    const { userWatchlistRepository } = this.server.services();

    const userWatchlist = await userWatchlistRepository.findById<UserWatchlist>('UserWatchlistModel', id, null);
    return userWatchlist;
  }

  async update({
    id,
    userWatchlistUpdateInfo,
  }: {
    id: number;
    userWatchlistUpdateInfo: UserWatchlistUpdateInfo;
  }) {
    const { userWatchlistRepository } = this.server.services();
    // update userWatchlist info
    await userWatchlistRepository.update<UserWatchlistUpdateInfo>('UserWatchlistModel', id, userWatchlistUpdateInfo, null);
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    userWatchlistService: UserWatchlistService;
  }
}
