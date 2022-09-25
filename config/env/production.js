import 'dotenv/config';

export default {
  DATABASE_URL: process.env.PROD_DB_URL || process.env.DATABASE_URL
};
