/* eslint-disable import/prefer-default-export */
import { Company } from '../models';

export const getCompany = async (companyIds) => {
  const companies = await Company.find({ _id: { $in: companyIds } });
  return companyIds.map((companyId) => companies.find(
    (company) => `${company._id}` === `${companyId}`
  ));
};
