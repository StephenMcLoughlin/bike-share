import { createLogger, format, transports } from "winston";

class Logger {
  private static instance: Logger | null;
  private logger;

  private constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.splat(),
        format.printf(({ timestamp, level, message, stack }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/combined.log" }),
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      return new Logger();
    }
    return Logger.instance;
  }

  public info(msg: string) {
    this.logger.info(msg);
  }

  public warn(msg: string) {
    this.logger.warn(msg);
  }

  public error(msg: string, error?: Error | unknown) {
    this.logger.error(
      msg,
      error instanceof Error ? { stack: error.stack } : {}
    );
  }
}

export default Logger.getInstance();
