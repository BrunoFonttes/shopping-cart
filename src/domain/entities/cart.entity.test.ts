import { Cart } from "./cart.entity";
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
	describe("test calculated totalPrice", () => {
		it("should return the full price:(use case test 1)", () => {
			const cart = new Cart(1, { [tshirt.id]: { item: tshirt, amount: 3 } });

			expect(cart.totalPrice).toBe(Number((tshirt.price * 2).toFixed(2)));
		});
		it("should return the total price with discount applied:(use case test 2)", () => {
			const cart = new Cart(1, {
				[tshirt.id]: { item: tshirt, amount: 2 },
				[jeans.id]: { item: jeans, amount: 2 },
			});

			expect(cart.totalPrice).toBe(
				Number((tshirt.price * 1 + jeans.price * 2).toFixed(2)),
			);
		});
		it("should return the total price with discount applied:(use case test 3)", () => {
			const cart = new Cart(1, {
				[tshirt.id]: { item: tshirt, amount: 1 },
				[jeans.id]: { item: jeans, amount: 2 },
				[dress.id]: { item: dress, amount: 3 },
			});

			expect(cart.totalPrice).toBe(
				Number((jeans.price * 2 + dress.price * 2).toFixed(2)),
			);
		});
	});
});
