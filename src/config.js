const { resolve } = require("path");

const dotenv = require("dotenv");

const environments = require("./core/constants/environments");
const getCurrentEnvironment = require("./core/utils/current-environment");
const normalizePort = require("./core/utils/normalize-port");

const currentEnvironment = getCurrentEnvironment();
const isValidEnvironment = Object.prototype.hasOwnProperty.call(
  environments,
  currentEnvironment.toUpperCase()
);

if (!isValidEnvironment) {
  throw Error(`Unknow environment: ${currentEnvironment}`);
}

const { error } = dotenv.config({
  path: resolve(`.env.${currentEnvironment}`)
});
if (error) {
  throw new Error(`Couldn't find .env.${currentEnvironment} file`);
}

if (!process.env.APP_KEY) {
  throw new Error(`APP_KEY environment variable must be defined`);
}

if (process.env.APP_KEY.length < 32) {
  throw new Error(`APP_KEY environment variable must be at least 32 characters long`);
}

if (!process.env.DB_NAME) {
  throw new Error(`DB_NAME environment variable must be defined`);
}

module.exports = {
  env: currentEnvironment,
  port: normalizePort(process.env.APP_PORT) || 8080,
  key: process.env.APP_KEY,
  logsDir: process.env.APP_LOGS_DIR || "logs",
  dbConnection: process.env.DB_CONNECTION || "mysql",
  dbHost: process.env.DB_HOST || "127.0.0.1",
  dbPort: normalizePort(process.env.DB_PORT) || 3306,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME || "root",
  dbPassword: process.env.DB_PASSWORD
};
