export class InternalError extends Error {
	constructor(public readonly errorDetails: Error) {
		super("internal error");
	}
}
