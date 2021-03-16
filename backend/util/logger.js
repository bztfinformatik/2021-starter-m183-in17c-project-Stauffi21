const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.NODE_LOGLEVEL,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [new winston.transports.File({ filename: "log/api.log" })],
});

module.exports = logger;