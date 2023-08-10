export class ValidationError extends Error {
	constructor(public readonly validationErrors: string[]) {
		super("validation error");
	}
}
