import constants from '../constants';

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_API,
  AUTH_REQUIRED,
  INVALID_PERMISSION,
  INVALID_CREDENTIALS,
  ACCESS_REVOKED
} = constants;

export default {
  serverError: { message: INTERNAL_SERVER_ERROR, status: 500, name: 'ApiError' },
  notFoundApi: { message: NOT_FOUND_API, status: 404, name: 'ApiError' },
  unAuthorized: { message: INVALID_PERMISSION, status: 403, name: 'ApiError' },
  accessRevoked: { message: ACCESS_REVOKED, status: 403, name: 'ApiError' },
  inValidLogin: { message: INVALID_CREDENTIALS, status: 401, name: 'ApiError' },
  conflictSignupError: { message: INVALID_CREDENTIALS, status: 409, name: 'ApiError' },
  conflictError: { message: INVALID_CREDENTIALS, status: 409, name: 'ApiError' },
  authRequired: { message: AUTH_REQUIRED, status: 401, name: 'ApiError' }
};
