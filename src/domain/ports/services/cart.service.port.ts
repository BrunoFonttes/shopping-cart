import { Either } from "../../../core/either";
import { Cart } from "../../entities/cart.entity";

export interface CartServicePort {
	addOrUpdateItem(cart: {
		userId: number;
		itemId: number;
		amount: number;
	}): Promise<Either<Error, void>>;

	removeItem: (cart: { userId: number; itemId: number }) => Promise<Either<Error, void>>;

	getCart: (userId: number) => Promise<Either<Error, Cart>>;
}
