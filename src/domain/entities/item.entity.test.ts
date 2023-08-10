import { ValidationError } from "../errors/validationError";
import {
	Item,
	invalidIdErrorMsg,
	invalidNameErrorMsg,
	invalidPriceErrorMsg,
} from "./item.entity";

describe("test item creation", () => {
	it("should return invalid id error when id is not an integer", () => {
		const item = Item.create(1.2, "dress", 25);

		expect(item.isFailure()).toBe(true);
		expect((item.value as ValidationError).validationErrors).toStrictEqual([
			invalidIdErrorMsg,
		]);
	});
	it("should return invalid id error when id is a negative integer", () => {
		const item = Item.create(-1, "dress", 25);

		expect(item.isFailure()).toBe(true);
		expect((item.value as ValidationError).validationErrors).toStrictEqual([
			invalidIdErrorMsg,
		]);
	});
	it("should return invalid name error when name.length is < 3", () => {
		const item = Item.create(1, "d", 25);

		expect(item.isFailure()).toBe(true);
		expect((item.value as ValidationError).validationErrors).toStrictEqual([
			invalidNameErrorMsg,
		]);
	});
	it("should return invalid name error when name.length is > 255", () => {
		const item = Item.create(1, "x".repeat(256), 25);

		expect(item.isFailure()).toBe(true);
		expect((item.value as ValidationError).validationErrors).toStrictEqual([
			invalidNameErrorMsg,
		]);
	});
	it("should return invalid price error when price is <= 0", () => {
		const item = Item.create(1, "dress", -25);

		expect(item.isFailure()).toBe(true);
		expect((item.value as ValidationError).validationErrors).toStrictEqual([
			invalidPriceErrorMsg,
		]);
	});
	it("should return invalid price error when price has more than 2 decimal places", () => {
		const item = Item.create(1, "dress", 25.789);

		expect(item.isFailure()).toBe(true);
		expect((item.value as ValidationError).validationErrors).toStrictEqual([
			invalidPriceErrorMsg,
		]);
	});

	it("should return an Item when all parameters are valid", () => {
		const item = Item.create(1, "dress", 25.99);

		expect(item.isSuccess()).toBe(true);
		expect(item.value as Item).toStrictEqual(Item.load(1, "dress", 25.99));
	});
});
