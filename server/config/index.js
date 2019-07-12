
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DATA_SECRET: process.env.DATA_SECRET,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET,
};
