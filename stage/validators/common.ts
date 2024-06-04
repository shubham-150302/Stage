import Joi from 'joi';

export const paginationRequestBaseModelKeys = {
  page: Joi.number().min(0).default(0),
  limit: Joi.number().min(0).max(200).default(10),
};

export const paginationRequestBaseModel = Joi.object(paginationRequestBaseModelKeys);