import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';
import { Model } from '@hapipal/schwifty';

const Joi = JoiBase.extend(JoiDate);

export default class UserWatchlistModel extends Model {
  static get tableName() {
    return 'userWatchList';
  }

  static get idColumn() {
    return 'id';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().positive().integer(),
      fkUser: Joi.number().positive().integer().required(),
      fkMovie: Joi.number().positive().integer().allow(null),
      fkTvShow: Joi.number().positive().integer().allow(null),
      createdAt: Joi.date().iso(),
      removedAt: Joi.date().iso(),
      updatedAt: Joi.date().iso(),
    });
  }
}

declare module '@hapipal/schwifty' {
  interface RegisteredModels {
    UserWatchlistModel: typeof UserWatchlistModel;
  }
}
