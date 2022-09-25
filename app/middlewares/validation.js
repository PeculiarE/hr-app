import { helpers } from '../utils';

const {
  ResponseHelper: { errorResponse, moduleErrLogger },
  GenericHelper: { validateInput }
} = helpers;

const validate = (schema) => async (req, res, next) => {
  try {
    await validateInput(schema, req.body);
    next();
  } catch (error) {
    moduleErrLogger(error, 400);
    errorResponse(req, res, {
      status: 400,
      name: 'ApiError',
      message: error.details[0].message
    });
  }
};

export default { validate };
