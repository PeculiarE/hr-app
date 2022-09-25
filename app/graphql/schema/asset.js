import { gql } from 'apollo-server-express';

const Asset = gql`
  type Asset {
    _id: ObjectID!
    name: String!
    description: String!
    company: Company!
    category: AssetCategory!
    serialNo: String!
    isAvailable: Boolean!
    assignee: Employee
  }

  # ENUMS
  enum AssetStatus {
    assigned
    unassigned
  }

  enum AssetCategory {
    electronics
    furniture
    office_supplies
  }

  # INPUTS
  input AssetInputData {
    name: String!
    description: String!
    category: AssetCategory!
    serialNo: String!
  }

  input AssetAssignData {
    id: ObjectID!
    assignee: ObjectID!
  }

  input AssetFilter {
    status: AssetStatus
  }

  # RESPONSES
  type SingleAssetResponse {
    status: Int!
    message: String!
    data: Asset
  }

  type MultipleAssetsResponse {
    status: Int!
    message: String!
    data: [Asset]
    hasNextPage: Boolean
  }

  # QUERIES AND MUTATIONS
  extend type Mutation {
    addNewAsset(data: AssetInputData!): SingleAssetResponse! @admin
    assignAsset(data: AssetAssignData!): SingleAssetResponse! @admin
  }

  extend type Query {
    fetchAssets(filter: AssetFilter, page: Int): MultipleAssetsResponse! @admin
    fetchSingleAsset(id: ObjectID!): SingleAssetResponse!
  }
`;

export default Asset;
