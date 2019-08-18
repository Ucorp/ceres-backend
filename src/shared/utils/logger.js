const path = require("path");

const winston = require("winston");
const chalk = require("chalk");
const { format } = require("date-fns");

const { env, logsDir } = require("../../config");
const environments = require("../constants/environments");

const IS_DEV = environments.DEVELOPMENT === env;

const customLevelMessage = (level, isDev) => {
  if (isDev) {
    return level === "error" ? chalk.red(level) : chalk.green(level);
  }

  return level;
};

const customFormat = winston.format.printf(info => {
  const timestamp = format(info.timestamp, "DD-MM-YYYY H:mm:ss");
  const level = customLevelMessage(info.level, IS_DEV);

  return `${timestamp} ${level}: ${info.message}`;
});

const transports = [];

if (!IS_DEV) {
  transports.push(
    new winston.transports.File({
      filename: path.resolve(logsDir, "error.log"),
      level: "error"
    }),
    new winston.transports.File({
      filename: path.resolve(logsDir, "combined.log")
    }),
    new winston.transports.Console({ level: "info" })
  );
} else {
  transports.push(new winston.transports.Console());
}

module.exports = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports
});
