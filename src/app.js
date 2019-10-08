const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { format } = require("date-fns");
const chalk = require("chalk");
const { NotFoundError } = require("objection");

const environments = require("./shared/constants/environments");
const { env } = require("./config");
const errorsHandler = require("./shared/errors-handler");

const { userModule } = require("./modules");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

if (env === environments.DEVELOPMENT) {
  morgan.token("date", () => {
    return format(Date.now(), "DD-MM-YYYY H:mm:ss");
  });

  morgan.token("method", req => {
    return chalk.cyan(req.method);
  });

  app.use(morgan(":date :method :url :status :res[content-length] - :response-time ms"));
}

// Modules
app.use("/api/v1", userModule);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new NotFoundError();
  next(err);
});

// / error handlers
app.use((err, req, res, next) => {
  errorsHandler(err, res);
  next();
});

module.exports = app;
