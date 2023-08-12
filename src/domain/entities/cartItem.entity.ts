import { Either, failure, success } from "../../core/either";
import { DomainValidationException } from "../errors/domainValidationException";
import { Item } from "./item.entity";

const invalidAmountError = "amount must be an integer > 0";

export class CartItem {
	private constructor(
		public readonly item: Item,
		public readonly amount: number,
	) {}

	static load(item: Item, amount: number): CartItem {
		return new CartItem(item, amount);
	}

	static create(item: Item, amount: number): Either<Error, CartItem> {
		if (!Number.isInteger(amount) || amount <= 0) {
			return failure(new DomainValidationException([invalidAmountError]));
		}

		return success(new CartItem(item, amount));
	}
}
