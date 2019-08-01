const path = require("path");
const winston = require("winston");

const config = require("../../config");

const transports = [
  new winston.transports.File({
    filename: path.resolve(config.logsDir, "error.log"),
    level: "error"
  }),
  new winston.transports.File({
    filename: path.resolve(config.logsDir, "combined.log")
  })
];

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports
});
