import { Either, failure, success } from "../../core/either";
import { DomainValidationException } from "../errors/domainValidationException";

export const invalidNameErrorMsg = "name length must be between 3 and 255";
export const invalidPriceErrorMsg = "price must be a number greather than 0 with 2 decimal places";
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
		/*
		 * Normally I would not put id here, since I would choose for the database to generate the id,
		 * but I decided to left it here just to ensure the items mock in inMemoryRepository was meeting the
		 * required fields
		 */
		id: number,
		name: string,
		price: number,
	): Either<DomainValidationException, Item> {
		const details: string[] = [];

		if (!Number.isInteger(id) || id < 1) {
			details.push(invalidIdErrorMsg);
		}

		if (name.length < 3 || name.length > 255) {
			details.push(invalidNameErrorMsg);
		}

		if (price <= 0 || Number(price.toFixed(2)) != price) {
			details.push(invalidPriceErrorMsg);
		}

		if (details.length) {
			return failure(new DomainValidationException(details));
		}

		return success(new Item(id, name, price));
	}

	static load(id: number, name: string, price: number) {
		return new Item(id, name, price);
	}
}
