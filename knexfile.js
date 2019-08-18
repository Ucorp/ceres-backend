const { resolve } = require("path");

const { dbConnection, dbHost, dbPort, dbUsername, dbPassword, dbName } = require("./src/config");

module.exports = {
  client: dbConnection,
  useNullAsDefault: true,
  connection: {
    host: dbHost,
    port: dbPort,
    user: dbUsername,
    password: dbPassword,
    database: dbName
  },
  migrations: {
    tableName: "migrations",
    directory: resolve("src/database/migrations")
  },
  seeds: {
    directory: resolve("src/database/seeds")
  }
};
