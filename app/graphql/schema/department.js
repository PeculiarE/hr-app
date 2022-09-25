import { gql } from 'apollo-server-express';

const Department = gql`
  type Department {
    _id: ObjectID!
    name: String!
    company: Company!
  }

  # RESPONSES
  type MultipleDepartmentsResponse {
    status: Int!
    message: String!
    data: [Department]
    hasNextPage: Boolean
  }

  type SingleDepartmentResponse {
    status: Int!
    message: String!
    data: Department
  }

  # INPUTS
  input DepartmentInputData {
    name: String!
  }

  # QUERIES AND MUTATIONS
  extend type Mutation {
    addNewDepartment(data: DepartmentInputData!): SingleDepartmentResponse! @admin
  }
  extend type Query {
    fetchAllDepartments(page: Int): MultipleDepartmentsResponse!
    fetchSingleDepartment(id: ObjectID!): SingleDepartmentResponse!
  }
`;

export default Department;
