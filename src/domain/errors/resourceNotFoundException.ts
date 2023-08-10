export class ResourceNotFoundException extends Error {
	constructor(public readonly message: string) {
		super("resource not found");
	}
}
