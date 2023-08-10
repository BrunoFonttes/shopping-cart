import { Either, failure, success } from "../../../core/either";
import { Cart } from "../../../domain/entities/cart.entity";
import { Item } from "../../../domain/entities/item.entity";
import { CartRepositoryPort } from "../../../domain/ports/cart.repository.port";

export class InMemoryCartRepository implements CartRepositoryPort {
	private carts = new Map<number, Cart>();

	async create(userId: number, cart: Cart): Promise<Either<Error, Cart>> {
		this.carts.set(userId, cart);
		return success(cart);
	}

	async getByUserId(userId: number): Promise<Either<Error, Cart | undefined>> {
		return success(this.carts.get(userId));
	}

	async addItem(
		cart: Cart,
		item: Item,
		amount: number,
	): Promise<Either<Error, Cart | undefined>> {
		const foundCart = this.carts.get(cart.userId);

		if (foundCart) {
			foundCart.addItem(item, amount);
			return success(foundCart);
		}

		return failure(new Error("cart not found"));
	}

	async removeItem(
		cart: Cart,
		item: Item,
		amount: number,
	): Promise<Either<Error, Cart>> {
		const foundCart = this.carts.get(cart.userId);

		if (foundCart) {
			foundCart.removeItem(item, amount);
			return success(foundCart);
		}

		return failure(new Error("cart not found"));
	}
}
