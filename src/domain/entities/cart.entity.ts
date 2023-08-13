import { logger } from "../../core/logger";
import { CartItem } from "./cartItem.entity";

export class Cart {
	public readonly totalPrice: number;

	public readonly discount: number;

	public readonly discountPrice: number;

	constructor(
		public readonly userId: number,
		public readonly items: Record<number, CartItem>,
	) {
		const { totalPrice, discount, discountPrice } = this.calculatePrices();

		this.totalPrice = totalPrice;
		this.discount = discount;
		this.discountPrice = discountPrice;
	}

	private consolidateCart(itemsIdsOrderedByPrice: number[]) {
		return itemsIdsOrderedByPrice.reduce(
			({ totalItems, totalPrice }, itemId) => {
				return {
					totalItems: totalItems + this.items[itemId].amount,
					totalPrice: totalPrice + this.items[itemId].item.price * this.items[itemId].amount,
				};
			},
			{
				totalItems: 0,
				totalPrice: 0,
			},
		);
	}

	private calculateDiscount(cart: {
		totalItems: number;
		itemsIdsOrderedByPrice: number[];
	}): number {
		const freeItemsAmount = Math.floor(cart.totalItems / 3);

		let discount: number = 0;

		for (let i = 0; i < freeItemsAmount; i++) {
			const itemId = cart.itemsIdsOrderedByPrice[i];

			discount += this.items[itemId].item.price;
		}

		return discount;
	}

	private calculatePrices() {
		const itemsIdsOrderedByPrice = Object.keys(this.items)
			.map(item => Number(item))
			.sort((a, b) => this.items[a].item.price - this.items[b].item.price);

		const consolidatedCart = this.consolidateCart(itemsIdsOrderedByPrice);

		logger.info("consolidated cart", consolidatedCart);

		const { totalItems, totalPrice } = consolidatedCart;

		const discount = this.calculateDiscount({
			totalItems: totalItems,
			itemsIdsOrderedByPrice,
		});

		return {
			totalPrice: Number(totalPrice.toFixed(2)),
			discountPrice: Number((totalPrice - discount).toFixed(2)),
			discount: Number(discount.toFixed(2)),
		};
	}
}
