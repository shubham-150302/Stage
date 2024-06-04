import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';
import { Model } from '@hapipal/schwifty';

const Joi = JoiBase.extend(JoiDate);

export default class MovieModel extends Model {
  static get tableName() {
    return 'movie';
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
      releaseDate: Joi.date().iso(),
      director: Joi.string().required(),
      actors: Joi.object().default({}),
      createdAt: Joi.date().iso(),
      updatedAt: Joi.date().iso(),
    });
  }
}

declare module '@hapipal/schwifty' {
  interface RegisteredModels {
    MovieModel: typeof MovieModel;
  }
}
