import { gql } from 'apollo-server-express';

const Employee = gql`
  type Employee {
    _id: ObjectID!
    firstName: String!
    lastName: String!
    middleName: String
    email: EmailAddress!
    isAdmin: Boolean!
    company: Company!
    maritalStatus: EmployeeMaritalStatus
    employmentInfo: EmployeeEmploymentInfo
    department: Department
    assets: [Asset]
  }

  type EmployeeEmploymentInfo {
    hireDate: DateTime!
    exitDate: DateTime
    workFormat: EmployeeWorkFormatType!
  }

  # ENUMS
  enum EmployeeWorkFormatType {
    remote
    onsite
  }

  enum EmployeeMaritalStatus {
    single
    married
    divorced
  }

  # RESPONSES
  type SingleEmployeeResponse {
    status: Int!
    message: String!
    data: Employee
  }

  type MultipleEmployeesResponse {
    status: Int!
    message: String!
    data: [Employee]
    hasNextPage: Boolean
  }
  
  # INPUTS
  input EmployeeInputData {
    firstName: String!
    lastName: String!
    middleName: String
    email: EmailAddress!
    maritalStatus: EmployeeMaritalStatus!
    employmentInfo: EmployeeEmploymentInfoInput!
    department: ObjectID!
  }

  input EmployeeEmploymentInfoInput {
    hireDate: DateTime!
    exitDate: DateTime
    workFormat: EmployeeWorkFormatType!
  }

  # QUERIES AND MUTATIONS
  extend type Mutation {
    addNewEmployee(data: EmployeeInputData!): SingleEmployeeResponse! @admin
  }

  extend type Query {
    fetchEmployees(page: Int): MultipleEmployeesResponse! @admin
    fetchSingleEmployee(id: ObjectID!): SingleEmployeeResponse!
  }
`;

export default Employee;
