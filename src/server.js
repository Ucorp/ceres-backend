const app = require("./app");
const { port, dbHost, dbPort } = require("./config");
const logger = require("./shared/utils/logger");
const dbConnector = require("./database/connectors/db-connector");

dbConnector
  .raw("select 1+1")
  .then(() => {
    logger.info(`connected to db server on: ${dbHost}:${dbPort}`);

    app
      .listen(port, () => {
        logger.info(`server listening on port: ${port}`);
      })
      .on("error", error => {
        logger.error(error.message);
        process.exit(1);
      });
  })
  .catch(e => {
    logger.error(e.message);
    dbConnector.destroy();
  });
