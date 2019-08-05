// @TODO: надо распилить этот файл
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const config = require("./config");
const logger = require("./services/logger");
const { sequelize } = require("./database/models");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// / error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message
    }
  });
  return next();
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("DB onnection has been established successfully.");
    app
      .listen(config.app.port, () => {
        logger.info(`server listening on port: ${config.app.port}`);
      })
      .on("error", error => {
        logger.error(error);
        process.exit(1);
      });
  })
  .catch(err => {
    logger.error("Unable to connect to the database:", err);
    sequelize.close();
    process.exit(1);
  });
