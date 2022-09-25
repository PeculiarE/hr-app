import constants from '../constants';

const { SUCCESS, FAIL, INTERNAL_SERVER_ERROR_MSG, DUPLICATED_ENTITY,
  DEFAULT_ERROR_MSG, ROLE_NOT_SUFFICIENT, ENTITY_NOT_FOUND,
  httpStatusCodes: {
    OK, INTERNAL_SERVER_ERROR, CONFLICT, FORBIDDEN,
    NOT_FOUND
  }
} = constants;
const serverError = { message: INTERNAL_SERVER_ERROR_MSG, status: 500 };

export const successResponse = (
  res,
  { data, message, code = OK }
) => res.status(code).json({
  status: SUCCESS,
  message,
  data
});

export const apiErrLogger = (error, req) => {
  logger.error(
    `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
};

export const errorResponse = (req, res, error) => {
  const aggregateError = { ...serverError, ...error };
  apiErrLogger(aggregateError, req);
  return res.status(aggregateError.status).json({
    status: FAIL,
    message: aggregateError.message,
    errors: aggregateError.errors
  });
};

export const moduleErrLogger = (error, status, message) => logger.error(`${status} - ${error.name} - ${error.message} - ${message}`);

export const nonPaginatedGraphQLResponse = (status, message, data) => ({
  status,
  message,
  data
});

export const paginatedGraphQLResponse = (status, message, data, hasNextPage) => ({
  status,
  message,
  data,
  hasNextPage
});

export const graphQLErrorResolver = (error, message) => {
  switch (error.message) {
    case 'DUPLICATED':
      moduleErrLogger(error, CONFLICT, message);
      return nonPaginatedGraphQLResponse(CONFLICT, DUPLICATED_ENTITY(error.resource), null);
    case 'FORBIDDEN':
      moduleErrLogger(error, FORBIDDEN, ROLE_NOT_SUFFICIENT);
      return nonPaginatedGraphQLResponse(FORBIDDEN, ROLE_NOT_SUFFICIENT, null);
    case 'NOT FOUND':
      moduleErrLogger(error, NOT_FOUND, message);
      return nonPaginatedGraphQLResponse(NOT_FOUND, ENTITY_NOT_FOUND(error.resource), null);
    default:
      moduleErrLogger(error, INTERNAL_SERVER_ERROR, message);
      return nonPaginatedGraphQLResponse(INTERNAL_SERVER_ERROR, DEFAULT_ERROR_MSG, null);
  }
};
