import { LoggerPort } from "../../../domain/ports/logger/logger.port";
import { winstonLogger } from "./winston";

export class WinstonAdapter extends LoggerPort {
	error(msg: string, data?: object | undefined): void {
		winstonLogger.error(this.sanitize(msg, data));
	}

	warn(msg: string, data?: object | undefined): void {
		winstonLogger.warn(this.sanitize(msg, data));
	}

	info(msg: string, data?: object | undefined): void {
		winstonLogger.info(this.sanitize(msg, data));
	}

	debug(msg: string, data?: object | undefined): void {
		winstonLogger.debug(this.sanitize(msg, data));
	}
}
