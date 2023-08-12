/* eslint-disable @typescript-eslint/no-unused-vars */
import { Either, success } from "../../../core/either";
import { Cart } from "../../entities/cart.entity";
import { CartItem } from "../../entities/cartItem.entity";
import { Item } from "../../entities/item.entity";
import { CartRepositoryPort } from "../repositories/cart.repository.port";

export const cartRepositoryStub: CartRepositoryPort = {
	async getByUserId(userId: number): Promise<Either<Error, Cart>> {
		const cartItems: Record<number, CartItem> = {
			1: {
				item: {
					id: 1,
					name: "tshirt",
					price: 25.0,
				},
				amount: 2,
			},
			2: {
				item: {
					id: 1,
					name: "jeans",
					price: 18.99,
				},
				amount: 2,
			},
		};

		return success(new Cart(userId, cartItems));
	},
	async addOrUpdateItem(_userId: number, _cartItem: CartItem): Promise<Either<Error, Cart>> {
		return success({} as Cart);
	},
	async removeItem(_userId: number, _item: Item): Promise<Either<Error, Cart>> {
		return success({} as Cart);
	},
};
