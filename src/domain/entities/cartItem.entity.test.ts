import { CartItem } from "./cartItem.entity";
import { Item } from "./item.entity";

const tshirt: Item = {
	id: 1,
	name: "T-shirt",
	price: 12.99,
};

describe("tests cart item value object", () => {
	it("should create a cart item successfully when using amount > 0", () => {
		const cartItemOrError = CartItem.create(tshirt, 3);

		expect(cartItemOrError.isSuccess()).toBe(true);
		expect((cartItemOrError.value as CartItem).item).toStrictEqual(tshirt);
		expect((cartItemOrError.value as CartItem).amount).toStrictEqual(3);
	});
	it("should create a cart item successfully when using amount < 0", () => {
		const cartItemOrError = CartItem.create(tshirt, -3);

		expect(cartItemOrError.isFailure()).toBe(true);
	});
	it("should create a cart item successfully when using amount === 0", () => {
		const cartItemOrError = CartItem.create(tshirt, 0);

		expect(cartItemOrError.isFailure()).toBe(true);
	});
});
