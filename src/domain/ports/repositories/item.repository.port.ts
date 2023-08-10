import { Either } from "../../../core/either";
import { Item } from "../../entities/item.entity";

/**
 * I opted for using Either type here because having a concrete SQL driver implementation,
 *  we can check in the service if the repository method result has succeeded or failed,
 *  and if it fails, decide in the place of the code the error happens to recover or not
 */
export interface ItemRepositoryPort {
	getAll: () => Promise<Either<Error, Item[]>>;
	getById(id: number): Promise<Either<Error, Item>>;
}
