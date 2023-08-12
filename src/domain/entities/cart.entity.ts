import { CartItem } from "./cartItem.entity";

export class Cart {
	public readonly totalPrice;

	constructor(
		public readonly userId: number,
		public readonly items: Record<number, CartItem>,
	) {
		this.totalPrice = this.calculateTotalPrice();
	}

	private calculateTotalPrice(): number {
		const itemsIdsOrderedByPrice = Object.keys(this.items)
			.map(item => Number(item))
			.sort((a, b) => this.items[a].item.price - this.items[b].item.price);

		const { totalItems, fullPrice } = itemsIdsOrderedByPrice.reduce(
			({ totalItems, fullPrice }, itemId) => {
				return {
					totalItems: totalItems + this.items[itemId].amount,
					fullPrice: fullPrice + this.items[itemId].item.price * this.items[itemId].amount,
				};
			},
			{
				totalItems: 0,
				fullPrice: 0,
			},
		);

		const freeItemsAmount = Math.floor(totalItems / 3);

		let discount = 0;

		for (let i = 0; i < freeItemsAmount; i++) {
			const itemId = itemsIdsOrderedByPrice[i];

			discount += this.items[itemId].item.price;
		}

		return Number((fullPrice - discount).toFixed(2));
	}
}
