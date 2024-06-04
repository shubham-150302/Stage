import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';
import { Model } from '@hapipal/schwifty';

const Joi = JoiBase.extend(JoiDate);

export default class TVShowModel extends Model {
  static get tableName() {
    return 'tvShow';
  }

  static get idColumn() {
    return 'id';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().positive().integer(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      genres: Joi.object().default({}),
      episodes: Joi.object().default({}),
      createdAt: Joi.date().iso(),
      updatedAt: Joi.date().iso(),
    });
  }
}

declare module '@hapipal/schwifty' {
  interface RegisteredModels {
    TVShowModel: typeof TVShowModel;
  }
}
