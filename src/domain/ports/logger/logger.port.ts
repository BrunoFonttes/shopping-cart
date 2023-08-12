export type AllowedLogLevels = "error" | "warn" | "info" | "debug";
export abstract class LoggerPort {
	protected sanitize(msg: string, data?: object): string {
		/**
		 *  we could implement sanitization here, avoiding logging sensitive data.
		 * I didnt do it because it was not the focus, but maybe Cabin.js could be a great option
		 * https://cabinjs.com/?id=security-privacy-and-business-focused
		 * https://github.com/cabinjs/sensitive-fields/blob/master/index.json
		 *  */
		return JSON.stringify({ msg, data });
	}

	abstract error(msg: string, data?: object): void;

	abstract warn(msg: string, data?: object): void;

	abstract info(msg: string, data?: object): void;

	abstract debug(msg: string, data?: object): void;
}
