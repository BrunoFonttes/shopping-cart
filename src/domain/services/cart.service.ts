import { Either, failure, success } from "../../core/either";
import { Cart } from "../entities/cart.entity";
import { CartItem } from "../entities/cartItem.entity";
import { CartRepositoryPort } from "../ports/repositories/cart.repository.port";
import { ItemRepositoryPort } from "../ports/repositories/item.repository.port";
import { CartServicePort } from "../ports/services/cart.service.port";

export class CartService implements CartServicePort {
	constructor(
		private readonly cartRepository: CartRepositoryPort,
		private readonly itemRepository: ItemRepositoryPort,
	) {}

	async addOrUpdateItem(
		userId: number,
		itemId: number,
		amount: number,
	): Promise<Either<Error, void>> {
		const itemOrError = await this.itemRepository.getById(itemId);

		if (itemOrError.isFailure()) {
			return failure(itemOrError.value);
		}

		const item = itemOrError.value;

		const cartItemOrError = CartItem.create(item, amount);

		if (cartItemOrError.isFailure()) {
			return failure(cartItemOrError.value);
		}

		const cartItem = cartItemOrError.value;

		const cartOrError = await this.cartRepository.addOrUpdateItem(userId, cartItem);

		if (cartOrError.isFailure()) {
			return failure(cartOrError.value);
		}

		return success(void 0);
	}

	async removeItem(userId: number, itemId: number): Promise<Either<Error, void>> {
		const itemOrError = await this.itemRepository.getById(itemId);

		if (itemOrError.isFailure()) {
			return failure(itemOrError.value);
		}

		const item = itemOrError.value;

		const cartOrError = await this.cartRepository.removeItem(userId, item);

		if (cartOrError.isFailure()) {
			return failure(cartOrError.value);
		}

		return success(void 0);
	}

	async getCart(userId: number): Promise<Either<Error, Cart>> {
		const cartOrError = await this.cartRepository.getByUserId(userId);

		if (cartOrError.isFailure()) {
			return failure(cartOrError.value);
		}

		const cart = cartOrError.value;

		return success(cart);
	}
}