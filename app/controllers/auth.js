import { EmployeeService, GenericService, AuthService } from '../services';
import { helpers, constants } from '../utils';
import { Company, Employee } from '../models';

const { findEmployeeByEmail } = EmployeeService;
const { loginService } = AuthService;
const { createNewEntity, rollBackEntityCreation } = GenericService;

const {
  ResponseHelper: { successResponse, errorResponse, moduleErrLogger },
  AuthHelper: { authDataTransformer }
} = helpers;

const { ACCOUNT_CREATE_ERROR_STATUS, ACCOUNT_SIGNIN_ERROR,
  SIGN_UP_SUCCESS, DUPLICATED_ENTITY } = constants;

export const signUp = async (req, res) => {
  let company;
  try {
    const { companyDetails, employeeDetails } = await authDataTransformer(req.body);
    company = await createNewEntity(Company, companyDetails);
    await createNewEntity(Employee, {
      ...employeeDetails, company: company.id
    });
    successResponse(res, { message: SIGN_UP_SUCCESS, code: 201 });
  } catch (e) {
    await rollBackEntityCreation(Company, company);
    if (e.code === 11000) {
      return errorResponse(req, res, {
        status: 409,
        name: 'ApiError',
        message: DUPLICATED_ENTITY('Email or company name') });
    }
    moduleErrLogger(e, ACCOUNT_CREATE_ERROR_STATUS);
    errorResponse(req, res, e);
  }
};

export const signIn = async (req, res) => {
  try {
    const {
      salt, password, ...employee
    } = await findEmployeeByEmail(req.body.email) || {};
    const {
      error, errorObj, successObj
    } = await loginService(req.body.password, salt, password, employee);
    return error ? errorResponse(req, res, errorObj)
      : successResponse(res, successObj);
  } catch (e) {
    moduleErrLogger(e, ACCOUNT_SIGNIN_ERROR);
    errorResponse(req, res, e);
  }
};
