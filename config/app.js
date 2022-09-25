/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
import { json } from 'express';
import { createServer } from 'http';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './env';
import apiV1Routes from '../app/routes/v1';
import { constants, helpers } from '../app/utils';
import { AuthService } from '../app/services';

const morgan = require('morgan');

const { WELCOME, v1 } = constants;
const {
  ResponseHelper: { successResponse, errorResponse },
  ErrorHelper: { notFoundApi }
} = helpers;

const port = config.PORT || 5005;

const appConfig = async (app, server) => {
  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined', { stream: logger.stream }));

  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
  app.use(v1, apiV1Routes);

  app.use(`${v1}/graphql`, AuthService.authenticate);

  server.applyMiddleware({ app, path: `${v1}/graphql` });
  const httpServer = createServer(app);

  app.use((req, res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, next) => errorResponse(req, res, err));
  mongoose.set('debug', true);
  mongoose
    .connect(config.DATABASE_URL)
    .then(() => {
      logger.info('🚀 Db connected');
      httpServer.listen({ port }, () => {
        logger.info(
          `🚀🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
        );
      });
    })
    .catch((error) => {
      logger.error(error.message);
      process.exit(0);
    });
};

export default appConfig;
