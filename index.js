import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs, schemaDirectives } from './app/graphql';
import Logger from './config/logger';
import { appConfig } from './config';
import { helpers } from './app/utils';
import { DataLoaderService } from './app/services';

global.logger = Logger.createLogger({ label: 'HR_APP' });
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground: true,
  introspection: true,
  context: ({ req }) => {
    const { employee } = req;
    return {
      employee,
      loaders: DataLoaderService
    };
  },
  formatError: (err) => helpers.ResponseHelper.graphQLErrorResolver(err)
});

appConfig(app, server);

export default app;
