import { gql } from 'apollo-server-express';

const Company = gql`
  type Company {
    _id: ObjectID!
    name: String!
    email: String!
    industry: String!
    city: String!
    state: String!
    country: String!
    size: String!
  }

  # RESPONSES
  type CompanyResponse {
    status: Int!
    message: String!
    data: Company
  }
`;

export default Company;
