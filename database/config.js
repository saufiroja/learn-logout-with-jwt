require('dotenv').config();

const { DB_NAME, DB_PORT, DB_HOST, DB_USER, DB_PASS } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: 'database_test',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: 'database_production',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
  },
};
