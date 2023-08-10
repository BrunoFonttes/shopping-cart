import { Cart, CartItem } from "./cart.entity";
import { Item } from "./item.entity";

// Using class like a type here avoiding validation just to simplify tests
const tshirt: Item = {
	id: 1,
	name: "T-shirt",
	price: 12.99,
};

const jeans: Item = {
	id: 2,
	name: "Jeans",
	price: 25.0,
};

const dress: Item = {
	id: 3,
	name: "Dress",
	price: 20.65,
};

describe("tests cart entity", () => {
	describe("addItem", () => {
		it("should return cart with the added items", () => {
			const cart = new Cart(1);

			cart
				.addItem(tshirt, 1)
				.addItem(jeans, 2)
				.addItem(dress, 2)
				.addItem(dress, 1);

			const expectedCart: Record<number, CartItem> = {
				1: {
					item: tshirt,
					amount: 1,
				},
				2: {
					item: jeans,
					amount: 2,
				},
				3: {
					item: dress,
					amount: 3,
				},
			};

			expect(cart.items).toStrictEqual(expectedCart);
		});
		it("should not add items with negative amount", () => {
			const cart = new Cart(1);

			cart.addItem(tshirt, 1).addItem(tshirt, -2).addItem(dress, 3);

			const expectedCart: Record<number, CartItem> = {
				1: {
					item: tshirt,
					amount: 1,
				},
				3: {
					item: dress,
					amount: 3,
				},
			};

			expect(cart.items).toStrictEqual(expectedCart);
		});

		describe("removeItem", () => {
			it("should return cart without the removed items", () => {
				const cart = new Cart(1);

				cart.addItem(tshirt, 1).addItem(jeans, 2).addItem(dress, 3);

				cart.removeItem(dress, 2);

				const expectedCart: Record<number, CartItem> = {
					1: {
						item: tshirt,
						amount: 1,
					},
					2: {
						item: jeans,
						amount: 2,
					},
					3: {
						item: dress,
						amount: 1,
					},
				};

				expect(cart.items).toStrictEqual(expectedCart);
			});
			it("should not remove items with negative amount", () => {
				const cart = new Cart(1);

				cart.addItem(tshirt, 1).addItem(jeans, 2).addItem(dress, 3);

				cart.removeItem(dress, -2);

				const expectedCart: Record<number, CartItem> = {
					1: {
						item: tshirt,
						amount: 1,
					},
					2: {
						item: jeans,
						amount: 2,
					},
					3: {
						item: dress,
						amount: 3,
					},
				};

				expect(cart.items).toStrictEqual(expectedCart);
			});
		});
	});
	describe("test calculated totalPrice", () => {
		it("should return the full price:(use case test 1)", () => {
			const cart = new Cart(1);

			cart.addItem(tshirt, 3);
			expect(cart.totalPrice).toBe(Number((tshirt.price * 2).toFixed(2)));
		});
		it("should return the total price with discount applied:(use case test 2)", () => {
			const cart = new Cart(2);

			cart.addItem(tshirt, 2).addItem(jeans, 2);
			expect(cart.totalPrice).toBe(
				Number((tshirt.price * 1 + jeans.price * 2).toFixed(2)),
			);
		});
		it("should return the total price with discount applied:(use case test 3)", () => {
			const cart = new Cart(3);

			cart.addItem(tshirt, 1).addItem(jeans, 2).addItem(dress, 3);
			expect(cart.totalPrice).toBe(
				Number((jeans.price * 2 + dress.price * 2).toFixed(2)),
			);
		});
		it("should return the total price with discount applied:((new)use case test 1)", () => {
			const cart = new Cart(3);

			cart
				.addItem(tshirt, 1)
				.addItem(jeans, 2)
				.addItem(dress, 3)
				.removeItem(jeans, 1);

			expect(cart.totalPrice).toBe(
				Number((jeans.price + dress.price * 3).toFixed(2)),
			);
		});
	});
});
