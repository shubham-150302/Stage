import { ContentType } from '@interfaces/content';
import Joi from 'joi';

export const addContentRequestPayload = Joi.object({
  contentType: Joi.string().valid(ContentType.MOVIE, ContentType.TV_SHOW).required(),
  contentId: Joi.number().required(),
});

export const contentIdRequestParams = Joi.object({
  contentId: Joi.number().required(),
})
