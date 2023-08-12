import { Either, failure, success } from "../../core/either";
import { ValidationError } from "../errors/validationError";
import { Item } from "./item.entity";

const invalidAmountError = "amount must be a integer > 0";

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
			return failure(new ValidationError([invalidAmountError]));
		}

		return success(new CartItem(item, amount));
	}
}
