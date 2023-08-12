import { Either, failure, success } from "../../../core/either";
import { Item } from "../../../domain/entities/item.entity";
import { ResourceNotFoundException } from "../../../domain/errors/resourceNotFoundException";
import { ItemRepositoryPort } from "../../../domain/ports/repositories/item.repository.port";

type ItemModel = {
	readonly id: number;
	readonly name: string;
	readonly price: number;
};

export class InMemoryItemRepository implements ItemRepositoryPort {
	private items = new Map<number, ItemModel>();

	constructor() {
		const tshirt = Item.create(1, "T-Shirt", 12.99);

		if (tshirt.isFailure()) {
			throw tshirt.value;
		}

		const jeans = Item.create(2, "Jeans", 25.0);

		if (jeans.isFailure()) {
			throw jeans.value;
		}

		const dress = Item.create(3, "Dress", 20.65);

		if (dress.isFailure()) {
			throw dress.value;
		}

		[tshirt.value, jeans.value, dress.value].forEach(item => {
			this.items.set(item.id, item);
		});
	}

	async getAll(): Promise<Either<Error, Item[]>> {
		return success(Array.from(this.items.values()));
	}

	async getById(id: number): Promise<Either<Error, Item>> {
		const item = this.items.get(id);

		if (item) {
			return success(item);
		} else {
			return failure(new ResourceNotFoundException("item not found"));
		}
	}
}
