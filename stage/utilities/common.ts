import Boom from '@hapi/boom';

export const env = <T>(envName: string, defaultValue: T): T | string =>
  process.env[envName] || defaultValue;

export const failAction = async (request, h, err) => {
  throw Boom.badRequest(err.message, err);
};

