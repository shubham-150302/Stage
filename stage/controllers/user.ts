import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { ContentAddRequestPayload, ContentType } from '@interfaces/content';
import { UserWatchlist } from '@interfaces/user-watch-list';
import { handleDBError, prepareResponse, contentNotFoundError, contentAlreadyExistsInUserWatchList, contentNotFoundInUserWatchlistError, userWatchlistNotFoundError, unauthorizedError } from '@utilities';

export const addContentInUserWatchlist = async (
  request: Request,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { contentType, contentId } = request.payload as ContentAddRequestPayload;
  const { userWatchlistService, movieService, tVShowService } = request.services();
  const { user } = request.pre;
  try {
    if (!user) {
      throw unauthorizedError();
    }

    let content;
    let fkMovie = null;
    let fkTvShow = null;
    if (contentType === ContentType.MOVIE) {
      content = await movieService.findById({ id: contentId });
      fkMovie = content ? content.id : null;
    } else if (contentType === ContentType.TV_SHOW) {
      content = await tVShowService.findById({ id: contentId });
      fkTvShow = content ? content.id : null;
    }

    if (!content) {
      throw contentNotFoundError(contentType, contentId);
    }

    //TODO: Add `watchHistory column in user table`.
    const { id } = user;
    const contentInUserWatchList: UserWatchlist[] = await userWatchlistService.findUserWatchListByContentTypeAndContentId({ userId: id, contentType, contentId });
    const contentFound = contentInUserWatchList.find((item) => !item.removedAt);
    if (contentFound) {
      throw contentAlreadyExistsInUserWatchList(contentType, contentId);
    }

    // Save the content in user's Watchlist
    const userWatchlistInfo = {
      fkUser: id,
      fkMovie,
      fkTvShow,
    };
    const userWatchList = await userWatchlistService.createUserWatchlist({ userWatchlistInfo });
    return h.response(prepareResponse({ success: true, data: { id: userWatchList.id } }));
  } catch (err) {
    console.log(`addContentInUserWatchlist contentType=${contentType} contentId=${contentId} error=${err.message}`, err);
    throw handleDBError({ err });
  }
};

export const getUserWatchlist = async (
  request: Request,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { page, limit } = request.query;
  const { userWatchlistService } = request.services();
  const { user } = request.pre;
  try {
    if (!user) {
      throw unauthorizedError();
    }

    const { id } = user;

    const userWatchList = await userWatchlistService.findByUserId({ userId: id, page, limit });
    const { results, total } = userWatchList;
    return h.response(
      prepareResponse({
        success: true,
        data: {
          results,
          total,
          size: limit,
          page,
          nbPages: Math.ceil(total / limit),
        },
      }),
    );
  } catch (err) {
    console.log(`getUserWatchlist error=${err.message}`, err);
    throw handleDBError({ err });
  }
};

export const removeContentFromUserWatchList = async (
  request: Request,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { contentId } = request.params;
  const { userWatchlistService } = request.services();
  const { user } = request.pre;
  try {
    if (!user) {
      throw unauthorizedError();
    }

    const { id } = user;

    const contentInUserWatchList = await userWatchlistService.findById({ id: contentId });
    if (!contentInUserWatchList || contentInUserWatchList.removedAt) {
      throw userWatchlistNotFoundError(contentId);
    }

    if (contentInUserWatchList.fkUser !== id) {
      throw contentNotFoundInUserWatchlistError(contentId);
    }

    await userWatchlistService.update({ id: contentId, userWatchlistUpdateInfo: { removedAt: new Date().toISOString() } })

    return h.response(
      prepareResponse({
        success: true,
        data: {},
      }),
    );
  } catch (err) {
    console.log(`removeContentFromUserWatchList error=${err.message}`, err);
    throw handleDBError({ err });
  }
};
