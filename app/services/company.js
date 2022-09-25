/* eslint-disable import/prefer-default-export */
import { Company } from '../models';

export const getCompany = async (companyId) => Company.findById(companyId);
