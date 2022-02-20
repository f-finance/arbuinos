import winston from "winston";

const myFormat = winston.format.printf(
  ({ level, message, label, timestamp, ...meta }) => {
    // return `${timestamp} [${label}] ${level}: ${message}`;
    return `[${timestamp}] ${level}: ${message} ${
      !!Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    }`;
  }
);

export default winston.createLogger({
  level: "info",
  format: winston.format.combine(
    /* winston.format.label({ label: "right meow!" }), */
    winston.format.timestamp(),
    winston.format.colorize(),
    /* winston.format.prettyPrint() */
    myFormat
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});
