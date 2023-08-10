import { Either, failure, success } from "../core/either";
import { ValidationError } from "./errors/validationError";

export const invalidNameErrorMsg = "name length must be between 3 and 255";
export const invalidPriceErrorMsg =
	"price must be a number greather than 0 with 2 decimal places";
export const invalidIdErrorMsg = "id must be a positive integer";

export class Item {
	public readonly id: number;

	public readonly name: string;

	public readonly price: number;

	private constructor(id: number, name: string, price: number) {
		this.id = id;
		this.name = name;
		this.price = price;
	}

	static create(
		id: number,
		name: string,
		price: number,
	): Either<ValidationError, Item> {
		const validationErrors: string[] = [];

		if (!Number.isInteger(id) || id < 1) {
			validationErrors.push(invalidIdErrorMsg);
		}

		if (name.length < 3 || name.length > 255) {
			validationErrors.push(invalidNameErrorMsg);
		}

		if (price <= 0 || Number(price.toFixed(2)) != price) {
			validationErrors.push(invalidPriceErrorMsg);
		}

		if (validationErrors.length) {
			return failure(new ValidationError(validationErrors));
		}

		return success(new Item(id, name, price));
	}

	static load(id: number, name: string, price: number) {
		return new Item(id, name, price);
	}
}
