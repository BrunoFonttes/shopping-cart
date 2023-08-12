import { Either, success } from "../../../core/either";
import { Item } from "../../entities/item.entity";
import { ItemRepositoryPort } from "../repositories/item.repository.port";

export const itemRepositoryStub: ItemRepositoryPort = {
	async getAll(): Promise<Either<Error, Item[]>> {
		return success([] as Item[]);
	},

	async getById(id: number): Promise<Either<Error, Item>> {
		return success({
			id,
			name: "tshirt",
			price: 20.99,
		});
	},
};
