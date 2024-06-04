import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';
import { Model } from '@hapipal/schwifty';

const Joi = JoiBase.extend(JoiDate);

export default class UserModel extends Model {
  static get tableName() {
    return 'user';
  }

  static get idColumn() {
    return 'id';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().positive().integer(),
      username: Joi.string().required().max(50),
      preferences: Joi.object().default({}),
      watchHistory: Joi.object().default({}),
      createdAt: Joi.date().iso(),
      updatedAt: Joi.date().iso(),
    });
  }
}

declare module '@hapipal/schwifty' {
  interface RegisteredModels {
    UserModel: typeof UserModel;
  }
}
