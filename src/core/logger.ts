import { LoggerPort } from "../domain/ports/logger/logger.port";
import { WinstonAdapter } from "../infra/logger/winston/winston.adapter";

export const logger: LoggerPort = new WinstonAdapter();
