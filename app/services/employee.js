import { Employee } from '../models';

export const findEmployeeByEmail = async (filter) => Employee.findOne({ email: filter }).select('-__v').populate('company').lean();

export const getEmployee = async (employeeId) => Employee.findById(employeeId);
