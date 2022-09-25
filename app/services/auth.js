import { helpers, constants } from '../utils';

const {
  ResponseHelper: { errorResponse },
  AuthHelper: { compareHash, addTokenToData, verifyToken },
  ErrorHelper
} = helpers;

const { LOGIN_SUCCESS, INVALID_CREDENTIALS } = constants;

export const loginService = async (bodyPassword, salt, existingPassword, employee) => {
  if (employee && compareHash(bodyPassword, existingPassword, salt)) {
    const token = addTokenToData({
      id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      company: employee.company._id,
      isAdmin: employee.isAdmin,
    });
    return {
      successObj: {
        message: LOGIN_SUCCESS,
        data: { employee, token }
      }
    };
  }
  return {
    error: true,
    errorObj: { status: 401, message: INVALID_CREDENTIALS }
  };
};

const checkAuthorizationToken = (authorization) => {
  let bearerToken = null;
  if (authorization) {
    const token = authorization.split(' ')[1];
    bearerToken = token || authorization;
  }
  return bearerToken;
};

const checkToken = (req) => {
  const {
    headers: { authorization }
  } = req;
  const bearerToken = checkAuthorizationToken(authorization);
  return (
    bearerToken
    || req.headers['x-access-token']
    || req.headers.token
    || req.body.token
    || req.query.access_token
  );
};

export const authenticate = (req, res, next) => {
  const token = checkToken(req);
  if (!token) {
    return errorResponse(req, res, ErrorHelper.authRequired);
  }
  try {
    const decoded = verifyToken(token);
    req.employee = decoded;
    next();
  } catch (err) {
    errorResponse(req, res, ErrorHelper.authRequired);
  }
};
