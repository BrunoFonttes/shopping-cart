import { Either } from "../../core/either";
import { Cart } from "../entities/cart.entity";
import { Item } from "../entities/item.entity";

/**
 * I opted for using Either type here because having a concrete SQL driver implementation,
 *  we can check in the service if the repository method result has succeeded or failed,
 *  and if it fails, decide in the place of the code the error happens to recover or not
 */
export interface CartRepositoryPort {
	create: (userId: number, cart: Cart) => Promise<Either<Error, Cart>>;
	getByUserId: (userId: number) => Promise<Either<Error, Cart | undefined>>;
	addItem: (
		cart: Cart,
		item: Item,
		amount: number,
	) => Promise<Either<Error, Cart | undefined>>;
	removeItem: (
		cart: Cart,
		item: Item,
		amount: number,
	) => Promise<Either<Error, Cart | undefined>>;
}
