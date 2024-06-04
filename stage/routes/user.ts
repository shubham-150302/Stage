import { ServerRoute } from '@hapi/hapi';
import { failAction } from '@utilities';
import { addContentRequestPayload, contentIdRequestParams } from '@validators';
import { addContentInUserWatchlist, getUserWatchlist, removeContentFromUserWatchList } from '@controllers/user';
import { paginationRequestBaseModel } from 'stage/validators/common';

const routes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/users/add/content/watch-list',
    options: {
      id: 'add-content-in-user-watch-list',
      description: 'Add content in user Watchlist',
      tags: ['user', 'api'],
      validate: {
        payload: addContentRequestPayload,
        failAction,
      },
      handler: addContentInUserWatchlist,
    },
  },
  {
    method: 'GET',
    path: '/users/watchlist',
    options: {
      id: 'get-user-watch-list',
      description: 'Get user Watchlist',
      tags: ['user', 'api'],
      validate: {
        query: paginationRequestBaseModel,
        failAction,
      },
      handler: getUserWatchlist,
    },
  },
  {
    method: 'DELETE',
    path: '/users/watchlist/{contentId}',
    options: {
      id: 'remove-content-from-user-watch-list',
      description: 'Remove content from user watch list',
      tags: ['user', 'api'],
      validate: {
        params: contentIdRequestParams,
        failAction,
      },
      handler: removeContentFromUserWatchList,
    },
  },
];

export default routes;
