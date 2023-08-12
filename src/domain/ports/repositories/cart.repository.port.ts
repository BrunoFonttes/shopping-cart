import { Either } from "../../../core/either";
import { Cart } from "../../entities/cart.entity";
import { CartItem } from "../../entities/cartItem.entity";
import { Item } from "../../entities/item.entity";

/**
 * I opted for using Either type here because having a concrete SQL driver implementation,
 *  we can check in the service if the repository method result has succeeded or failed,
 *  and if it fails, decide in the place of the code the error happens to recover or not
 */
export interface CartRepositoryPort {
	getByUserId: (userId: number) => Promise<Either<Error, Cart>>;
	addOrUpdateItem: (userId: number, cartItem: CartItem) => Promise<Either<Error, Cart>>;
	removeItem: (userId: number, item: Item) => Promise<Either<Error, Cart>>;
}
