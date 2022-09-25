import bcrypt from 'bcrypt';
import { hmac } from 'js-sha256';
import jwt from 'jsonwebtoken';
import config from '../../../config/env';

const { SECRET } = config;

export const generateHash = (salt, plain) => {
  const hash = hmac.create(salt);
  hash.update(plain);
  return hash.hex();
};

export const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return {
    salt,
    hash: generateHash(salt, plainPassword)
  };
};

export const compareHash = (plain = '', hash = '', salt = '') => {
  const hashMatch = generateHash(salt, plain);
  return hash === hashMatch;
};

export const generateToken = (payload, expiresIn = '10h') => jwt.sign(payload, SECRET, { expiresIn });

export const verifyToken = (token) => jwt.verify(token, SECRET);

export const addTokenToData = (data) => generateToken(data);

export const authDataTransformer = async (data) => {
  const {
    companyName: name,
    companyCity: city,
    companyState: state,
    companyCountry: country,
    companyEmail: email,
    industry,
    companySize: size,
    ...employee
  } = data;
  const companyDetails = { name, city, state, country, email, industry, size };
  const { salt, hash } = await hashPassword(employee.password);
  return { companyDetails, employeeDetails: { ...employee, isAdmin: true, salt, password: hash } };
};
