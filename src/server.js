const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const config = require("./config");
const logger = require("./services/logger");

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

app
  .listen(config.port, () => {
    logger.info(`server listening on port: ${config.port}`);
  })
  .on("error", error => {
    logger.error(error);
  });
