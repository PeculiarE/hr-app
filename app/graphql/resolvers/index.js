import { resolvers as scalarResolvers } from 'graphql-scalars';
import Employee from './employee';
import Department from './department';
import Asset from './asset';

const resolvers = [
  scalarResolvers,
  Department,
  Employee,
  Asset,
];
export default resolvers;
