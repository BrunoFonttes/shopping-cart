import { Item } from "./item.entity";

export type CartItem = {
	item: Item;
	amount: number;
};

export class Cart {
	public readonly items: Record<number, CartItem> = {};

	private _totalPrice = 0;

	constructor(public readonly userId: number) {}

	get totalPrice(): number {
		return this._totalPrice;
	}

	private updateTotalPrice(): void {
		const itemsIdsOrderedByPrice = Object.keys(this.items)
			.map(item => Number(item))
			.sort((a, b) => this.items[a].item.price - this.items[b].item.price);

		const { totalItems, fullPrice } = itemsIdsOrderedByPrice.reduce(
			({ totalItems, fullPrice }, itemId) => {
				return {
					totalItems: totalItems + this.items[itemId].amount,
					fullPrice:
						fullPrice +
						this.items[itemId].item.price * this.items[itemId].amount,
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

		this._totalPrice = Number((fullPrice - discount).toFixed(2));
	}

	addItem(item: Item, amount: number): Cart {
		if (!Number.isInteger(amount) || amount < 0) {
			return this;
		}

		const cartItem = this.items[item.id];

		if (cartItem) {
			cartItem.amount += amount;
		} else {
			this.items[item.id] = {
				item,
				amount,
			};
		}

		this.updateTotalPrice();
		return this;
	}

	removeItem(item: Item, amount: number): Cart {
		if (!Number.isInteger(amount) || amount < 0) {
			return this;
		}

		const cartItem = this.items[item.id];

		if (cartItem && cartItem?.amount >= amount) {
			cartItem.amount -= amount;
			this.updateTotalPrice();
		}

		return this;
	}
}
