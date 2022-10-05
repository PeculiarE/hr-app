import { Employee } from '../models';

export const findEmployeeByEmail = async (filter) => Employee.findOne({ email: filter }).select('-__v').populate('company').lean();

export const getEmployees = async (employeeIds) => {
  const employees = await Employee.find({ _id: { $in: employeeIds } });
  return employeeIds.map((employeeId) => employees.find(
    (employee) => `${employee._id}` === `${employeeId}`
  ));
};
