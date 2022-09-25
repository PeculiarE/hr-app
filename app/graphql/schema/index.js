import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import root from './root';
import Employee from './employee';
import Department from './department';
import Asset from './asset';
import Company from './company';

const schemaArray = [
  root,
  ...scalarTypeDefs,
  Employee,
  Department,
  Asset,
  Company
];

export default schemaArray;
