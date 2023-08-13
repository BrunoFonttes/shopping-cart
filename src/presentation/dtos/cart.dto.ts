type ItemDTO = {
	id: number;
	name: string;
	price: number;
};

type CartItemDTO = {
	item: ItemDTO;
	amount: number;
};
export type CartDTO = {
	items: CartItemDTO[];
	totalPrice: number;
	discountPrice: number;
	discount: number;
};
