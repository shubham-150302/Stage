import Boom from '@hapi/boom';
import {
  ValidationError,
  NotFoundError,
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} from 'objection';

export const handleDBError = ({ err }) => {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        return Boom.badRequest(
          JSON.stringify({
            error_code: 'ModelValidation',
            error_description: 'Validation Error',
          }),
        );
      case 'RelationExpression':
        return Boom.badRequest(
          JSON.stringify({
            error_code: 'RelationExpression',
            error_description: 'Validation Error',
          }),
        );
      case 'UnallowedRelation':
        return Boom.badRequest(
          JSON.stringify({
            error_code: 'UnallowedRelation',
            error_description: 'Validation Error',
          }),
        );
      case 'InvalidGraph':
        return Boom.badRequest(
          JSON.stringify({
            error_code: 'InvalidGraph',
            error_description: 'Validation Error',
          }),
        );
      default:
        return Boom.badRequest(
          JSON.stringify({
            error_code: 'UnknownValidationError',
            error_description: 'Validation Error',
          }),
        );
    }
  } else if (err instanceof NotFoundError) {
    return Boom.notFound(
      JSON.stringify({
        error_code: 'NotFound',
        error_description: 'Validation Error',
      }),
    );
  } else if (err instanceof UniqueViolationError) {
    return Boom.conflict(
      JSON.stringify({
        error_code: 'UniqueViolation',
        error_description: 'Validation Error',
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint,
        },
      }),
    );
  } else if (err instanceof NotNullViolationError) {
    return Boom.badRequest(
      JSON.stringify({
        error_code: 'NotNullViolation',
        error_description: 'Validation Error',
        data: {
          column: err.column,
          table: err.table,
        },
      }),
    );
  } else if (err instanceof ForeignKeyViolationError) {
    return Boom.conflict(
      JSON.stringify({
        error_code: 'ForeignKeyViolation',
        error_description: 'Validation Error',
        data: {
          table: err.table,
          constraint: err.constraint,
        },
      }),
    );
  } else if (err instanceof CheckViolationError) {
    return Boom.badRequest(
      JSON.stringify({
        error_code: 'CheckViolation',
        error_description: 'Validation Error',
        data: {
          table: err.table,
          constraint: err.constraint,
        },
      }),
    );
  } else if (err instanceof DataError) {
    return Boom.badRequest(
      JSON.stringify({
        error_code: 'InvalidData',
        error_description: 'Validation Error',
        data: {},
      }),
    );
  } else if (err instanceof DBError) {
    return Boom.internal(
      JSON.stringify({
        error_code: 'UnknownDatabaseError',
        error_description: 'Validation Error',
        data: {},
      }),
    );
  } else if (err && err.isBoom) {
    return err;
  } else {
    return Boom.internal(
      JSON.stringify({
        error_code: 'UnknownError',
        error_description: 'Validation Error',
        data: {},
      }),
    );
  }
};

export const contentNotFoundError = (contentType, id) =>
  Boom.notFound(
    JSON.stringify({
      error_code: 'ContentNotFoundError',
      error_description: `Content with contentType: [${contentType}] not found with id: [${id}]`,
    }),
  );

export const contentAlreadyExistsInUserWatchList = (contentType, id) =>
  Boom.badRequest(
    JSON.stringify({
      error_code: 'ContentAlreadyExistsInUserWatchList',
      error_description: `Content with contentType: [${contentType}] and id: [${id}] already exist in user's watch list.`,
    }),
  );

export const contentNotFoundInUserWatchlistError = (id) =>
  Boom.notFound(
    JSON.stringify({
      error_code: 'ContentNotFoundInUserWatchlistError',
      error_description: `Content not found in user Watchlist with id: [${id}]`,
    }),
  );

export const userWatchlistNotFoundError = (id) =>
  Boom.notFound(
    JSON.stringify({
      error_code: 'UserWatchlistNotFoundError',
      error_description: `User watch list not found with id: [${id}]`,
    }),
  );

export const unauthorizedError = () =>
  Boom.unauthorized(
    JSON.stringify({
      error_code: 'Unauthorized',
      error_description: 'Unauthorized',
    }),
  );