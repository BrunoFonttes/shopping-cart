export class DomainValidationException extends Error {
	constructor(public readonly details: string[]) {
		super("validation error");
	}
}
