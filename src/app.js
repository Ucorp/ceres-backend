const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { format } = require("date-fns");
const chalk = require("chalk");

const environments = require("./shared/constants/environments");
const { env } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

if (env === environments.DEVELOPMENT) {
  morgan.token("date", () => {
    return format(new Date(), "DD-MM-YYYY H:mm:ss");
  });

  morgan.token("method", req => {
    return chalk.cyan(req.method);
  });

  app.use(morgan(":date :method :url :status :res[content-length] - :response-time ms"));
}

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

module.exports = app;
