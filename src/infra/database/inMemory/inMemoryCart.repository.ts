import { Either, failure, success } from "../../../core/either";
import { Cart } from "../../../domain/entities/cart.entity";
import { CartItem } from "../../../domain/entities/cartItem.entity";
import { Item } from "../../../domain/entities/item.entity";
import { ResourceNotFoundException } from "../../../domain/errors/resourceNotFoundException";
import { CartRepositoryPort } from "../../../domain/ports/repositories/cart.repository.port";

type CartItemModel = {
	item: Item;
	amount: number;
};

export class InMemoryCartRepository implements CartRepositoryPort {
	private carts = new Map<number, Record<number, CartItemModel>>();

	async getByUserId(userId: number): Promise<Either<Error, Cart>> {
		const cart = this.carts.get(userId);

		if (cart) {
			if (Object.keys(cart).length === 0) {
				return failure(new ResourceNotFoundException("cart not found"));
			}

			return success(new Cart(userId, cart));
		}

		return failure(new ResourceNotFoundException("cart not found"));
	}

	async addOrUpdateItem(userId: number, cartItem: CartItem): Promise<Either<Error, Cart>> {
		const foundCart = this.carts.get(userId);

		if (foundCart) {
			foundCart[cartItem.item.id] = cartItem;
			return success(new Cart(userId, foundCart));
		} else {
			this.carts.set(userId, { [cartItem.item.id]: cartItem });
			return success(new Cart(userId, { [cartItem.item.id]: cartItem }));
		}
	}

	async removeItem(userId: number, item: Item): Promise<Either<Error, Cart>> {
		const foundCart = this.carts.get(userId);

		if (foundCart) {
			if (foundCart[item.id]) {
				delete foundCart[item.id];
				return success(new Cart(userId, foundCart));
			}

			return failure(new ResourceNotFoundException("item not found in cart"));
		}

		return failure(new ResourceNotFoundException("cart not found"));
	}
}
