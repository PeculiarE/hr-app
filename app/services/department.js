/* eslint-disable import/prefer-default-export */
import { Department } from '../models';

export const getDepartments = async (deptIds) => {
  const departments = await Department.find({ _id: { $in: deptIds } });
  return deptIds.map((deptId) => departments.find((dept) => `${dept._id}` === `${deptId}`));
};
