import Joi from 'joi';

export const stringCheck = (param, min = 2, max = 1000000000) => Joi
  .string()
  .required()
  .trim()
  .min(min)
  .max(max)
  .messages({
    'any.required': `${param} is a required field`,
    'string.max': `${param} can not be greater than ${max} characters`,
    'string.min': `${param} can not be lesser than ${min} characters`,
    'string.base': `${param} must be a string`,
    'string.empty': `${param} cannot be an empty field`,
  });

export const passwordCheck = () => Joi
  .string()
  .trim()
  .required()
  .min(7)
  .messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password field cannot be an empty field',
    'any.required': 'Password field is required',
    'string.min': 'Password can not be lesser than 7 characters'
  });

export const emailCheck = (param = 'Email') => Joi
  .string()
  .email()
  .required()
  .messages({
    'any.required': `${param} is a required field`,
    'string.email': `${param} is not valid`,
    'string.empty': `${param} cannot be an empty field`
  });

export const enumCheck = (fields, param) => Joi
  .string()
  .required()
  .valid(...fields)
  .messages({
    'string.empty': `${param} must not be an empty field`,
    'any.required': `${param} is a required field`,
    'any.only': `Please enter a valid ${param.toLowerCase()}`
  });

export const editStringCheck = (param, min = 1, max = 120000000000) => Joi
  .string()
  .min(min)
  .max(max)
  .trim()
  .empty()
  .allow(null)
  .messages({
    'string.base': `${param}  must be a string`,
    'string.empty': `${param} cannot be an empty field`,
    'string.min': `${param} can not be lesser than ${min} characters`,
    'string.max': `${param} can not be greater than ${max} characters`
  });
