const dotenv = require("dotenv");

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV =
  process.env.NODE_ENV || process.env.APP_ENV || "development";

module.exports = {
  port: parseInt(process.env.APP_PORT, 10) || 4444,
  logsDir: process.env.APP_LOGS_DIR || "logs"
};
