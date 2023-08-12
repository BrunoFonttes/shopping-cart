import { failure } from "../../core/either";
import { cartRepositoryStub } from "../ports/mocks/cart.repository.mock";
import { itemRepositoryStub } from "../ports/mocks/item.repository.mock";
import { CartService } from "./cart.service";

const makeSut = () => {
	const sut = new CartService(cartRepositoryStub, itemRepositoryStub);

	const spies = {
		cartRepositoryStub: {
			getByUserIdSpy: jest.spyOn(cartRepositoryStub, "getByUserId"),
			addOrUpdateItemSpy: jest.spyOn(cartRepositoryStub, "addOrUpdateItem"),
			removeItemSpy: jest.spyOn(cartRepositoryStub, "removeItem"),
		},
		itemRepositoryStub: {
			getAllSpy: jest.spyOn(itemRepositoryStub, "getAll"),
			getByIdSpy: jest.spyOn(itemRepositoryStub, "getById"),
		},
	};

	return { sut, spies };
};

beforeEach(() => {
	jest.resetAllMocks();
});

describe("tests cart service", () => {
	describe("tests addOrUpdateItem", () => {
		it("should return failure when item doesnt exist", async () => {
			const { sut, spies } = makeSut();

			spies.itemRepositoryStub.getByIdSpy.mockResolvedValueOnce(failure(new Error()));

			const resultOrError = await sut.addOrUpdateItem(1, 1, 2);

			expect(resultOrError.isFailure()).toBe(true);
		});
		it("should return failure when cartItem has validation errors", async () => {
			const { sut } = makeSut();

			const resultOrError = await sut.addOrUpdateItem(1, 1, -2);

			expect(resultOrError.isFailure()).toBe(true);
		});
		it("should return failure when its not possible to create/update cart", async () => {
			const { sut, spies } = makeSut();

			spies.cartRepositoryStub.addOrUpdateItemSpy.mockResolvedValueOnce(failure(new Error()));

			const resultOrError = await sut.addOrUpdateItem(1, 1, 2);

			expect(resultOrError.isFailure()).toBe(true);
		});
		it("should return success", async () => {
			const { sut } = makeSut();

			const resultOrError = await sut.addOrUpdateItem(-1, 1, 2);

			expect(resultOrError.isSuccess()).toBe(true);
		});
	});

	describe("tests removeItem", () => {
		it("should return failure when item doesnt exist", async () => {
			const { sut, spies } = makeSut();

			spies.itemRepositoryStub.getByIdSpy.mockResolvedValueOnce(failure(new Error()));

			const resultOrError = await sut.removeItem(1, 1);

			expect(resultOrError.isFailure()).toBe(true);
		});
		it("should return failure when its not possible to create/update cart", async () => {
			const { sut, spies } = makeSut();

			spies.cartRepositoryStub.removeItemSpy.mockResolvedValueOnce(failure(new Error()));

			const resultOrError = await sut.removeItem(1, 1);

			expect(resultOrError.isFailure()).toBe(true);
		});
		it("should return success", async () => {
			const { sut } = makeSut();

			const resultOrError = await sut.removeItem(1, 1);

			expect(resultOrError.isSuccess()).toBe(true);
		});
	});

	describe("tests getCart", () => {
		it("should return failure when its not possible to get cart", async () => {
			const { sut, spies } = makeSut();

			spies.cartRepositoryStub.getByUserIdSpy.mockResolvedValueOnce(failure(new Error()));

			const resultOrError = await sut.getCart(1);

			expect(resultOrError.isFailure()).toBe(true);
		});
		it("should return success", async () => {
			const { sut } = makeSut();

			const resultOrError = await sut.getCart(1);

			expect(resultOrError.isSuccess()).toBe(true);
		});
	});
});
