import { LoggerPort } from "./logger.port";
import { WinstonAdapter } from "./winston/winston.adapter";

export const logger: LoggerPort = new WinstonAdapter();
