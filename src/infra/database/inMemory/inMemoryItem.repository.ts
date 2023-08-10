import { Either, success } from "../../../core/either";
import { Item } from "../../../domain/entities/item.entity";
import { ItemRepositoryPort } from "../../../domain/ports/item.repository.port";

export class InMemoryCartRepository implements ItemRepositoryPort {
	private items = new Map<number, Item>();

	private constructor(items: Item[]) {
		items.forEach(item => {
			this.items.set(item.id, item);
		});
	}

	static create() {
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

		return new InMemoryCartRepository([tshirt.value, jeans.value, dress.value]);
	}

	async getAll(): Promise<Either<Error, Item[]>> {
		return success(Array.from(this.items.values()));
	}

	async getById(id: number): Promise<Either<Error, Item | undefined>> {
		return success(this.items.get(id));
	}
}
