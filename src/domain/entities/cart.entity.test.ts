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
		it("should calculate no discount:(use case test 0)", () => {
			const cart = new Cart(1, { [tshirt.id]: { item: tshirt, amount: 2 } });

			expect(cart.totalPrice).toEqual(Number((tshirt.price * 2).toFixed(2)));
			expect(cart.discount).toEqual(0);
			expect(cart.discountPrice).toEqual(Number((tshirt.price * 2).toFixed(2)));
		});
		it("should calculate discount:(use case test 1)", () => {
			const cart = new Cart(1, { [tshirt.id]: { item: tshirt, amount: 3 } });

			expect(cart.totalPrice).toEqual(Number((tshirt.price * 3).toFixed(2)));
			expect(cart.discount).toEqual(tshirt.price);
			expect(cart.discountPrice).toEqual(Number((tshirt.price * 2).toFixed(2)));
		});
		it("should calculate discount:(use case test 2)", () => {
			const cart = new Cart(1, {
				[tshirt.id]: { item: tshirt, amount: 2 },
				[jeans.id]: { item: jeans, amount: 2 },
			});

			expect(cart.totalPrice).toEqual(Number((tshirt.price * 2 + jeans.price * 2).toFixed(2)));
			expect(cart.discount).toEqual(tshirt.price);
			expect(cart.discountPrice).toEqual(Number((tshirt.price * 1 + jeans.price * 2).toFixed(2)));
		});
		it("should calculate discount:(use case test 3)", () => {
			const cart = new Cart(1, {
				[tshirt.id]: { item: tshirt, amount: 1 },
				[jeans.id]: { item: jeans, amount: 2 },
				[dress.id]: { item: dress, amount: 3 },
			});

			expect(cart.totalPrice).toEqual(
				Number((tshirt.price + jeans.price * 2 + dress.price * 3).toFixed(2)),
			);
			expect(cart.discount).toEqual(Number((tshirt.price + dress.price).toFixed(2)));
			expect(cart.discountPrice).toEqual(Number((jeans.price * 2 + dress.price * 2).toFixed(2)));
		});
		it("should calculate discount:(use case test 4)", () => {
			const cart = new Cart(1, { [tshirt.id]: { item: tshirt, amount: 9 } });

			expect(cart.totalPrice).toEqual(Number((tshirt.price * 9).toFixed(2)));
			expect(cart.discount).toEqual(Number(tshirt.price.toFixed(2)));
			expect(cart.discountPrice).toEqual(Number((tshirt.price * 8).toFixed(2)));
		});

		it("should calculate discount:(use case test 5)", () => {
			const cart = new Cart(1, {
				[tshirt.id]: { item: tshirt, amount: 10 },
				[jeans.id]: { item: jeans, amount: 1 },
				[dress.id]: { item: dress, amount: 5 },
			});

			expect(cart.totalPrice).toEqual(
				Number((tshirt.price * 10 + jeans.price + dress.price * 5).toFixed(2)),
			);
			expect(cart.discount).toEqual(Number((tshirt.price + dress.price + jeans.price).toFixed(2)));
			expect(cart.discountPrice).toEqual(Number((tshirt.price * 9 + dress.price * 4).toFixed(2)));
		});
	});
});
