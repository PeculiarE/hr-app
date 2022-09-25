/* eslint-disable import/prefer-default-export */
import { Department } from '../models';

export const getDepartment = async (deptId) => Department.findById(deptId);
