import winston, { createLogger, format, transports } from "winston";
import { env } from "@/config/env";
import { LogLevel } from "@/consts/logger";
import { LogContext, LogMessage } from "@/types/logger";

const isDev = env.NODE_ENV === "development";

const logger = createLogger({
  level: isDev ? LogLevel.DEBUG : LogLevel.INFO,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format((info) => {
      info.context = info.context
        ? `\n${JSON.stringify(info.context, null, 2)}`
        : "";
      info.level = info.level.toUpperCase();
      return info;
    })(),
    format.printf(({ level, message, timestamp, moduleName, context }) => {
      return `${timestamp} [${moduleName}] [${level}]: ${message}${context}`;
    }),
  ),
  transports: [
    new transports.Console(),
    ...(isDev
      ? []
      : [
          new transports.File({
            filename: "logs/err.log",
            level: LogLevel.ERROR,
          }),
          new transports.File({ filename: "logs/combined.log" }),
        ]),
  ],
});

class Logger {
  moduleName: string;
  _logger: winston.Logger;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
    this._logger = logger.child({ moduleName: this.moduleName });
  }

  private log(level: LogLevel, message: LogMessage, context?: LogContext) {
    this._logger.log({ level, message, context });
  }

  error(message: LogMessage, context?: LogContext) {
    this.log(LogLevel.ERROR, message, context);
  }

  warn(message: LogMessage, context?: LogContext) {
    this.log(LogLevel.WARN, message, context);
  }

  info(message: LogMessage, context?: LogContext) {
    this.log(LogLevel.INFO, message, context);
  }

  debug(message: LogMessage, context?: LogContext) {
    this.log(LogLevel.DEBUG, message, context);
  }
}

export { Logger };
