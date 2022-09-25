import Joi from 'joi';
import { helpers, constants } from '../utils';

const {
  ValidationHelper: {
    stringCheck, emailCheck, passwordCheck, enumCheck, editStringCheck
  }
} = helpers;

const { COMPANY_SIZE } = constants;

export const signUpSchema = Joi.object({
  firstName: stringCheck('First Name'),
  lastName: stringCheck('Last Name'),
  middleName: editStringCheck('Middle Name', 1),
  email: emailCheck(),
  password: passwordCheck(),
  companyName: stringCheck('Company\'s Name'),
  companyCity: stringCheck('Company\'s City'),
  companyState: stringCheck('Company\'s State'),
  companyCountry: stringCheck('Company\'s Country'),
  companyEmail: emailCheck('Company\'s Email'),
  industry: stringCheck('Industry'),
  companySize: enumCheck(COMPANY_SIZE, 'Company Size')
});

export const signInSchema = Joi.object({
  email: emailCheck(),
  password: passwordCheck()
});
