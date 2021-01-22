require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true}),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File(), { filename: "loggerfile.log" });
  winston.add(new winston.transports.mongoDB(), {
    db: "mongodb://localhost/vidly",
    level: "info",
  });
};
