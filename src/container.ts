import { CartRepositoryPort } from "./domain/ports/repositories/cart.repository.port";
import { ItemRepositoryPort } from "./domain/ports/repositories/item.repository.port";
import { CartServicePort } from "./domain/ports/services/cart.service.port";
import { CartService } from "./domain/services/cart.service";
import { InMemoryCartRepository } from "./infra/database/inMemory/inMemoryCart.repository";
import { InMemoryItemRepository } from "./infra/database/inMemory/inMemoryItem.repository";
import { CartController } from "./presentation/controllers/cart.controller";

class Container {
	private repositories!: {
		cart: CartRepositoryPort;
		item: ItemRepositoryPort;
	};

	private services!: { cart: CartServicePort };

	private _controllers!: { cart: CartController };

	constructor() {
		this.injectRepositories();
		this.injectServices();
		this.injectControllers();
	}

	get controllers() {
		return this._controllers;
	}

	private injectRepositories() {
		if (!this.repositories) {
			this.repositories = {
				cart: new InMemoryCartRepository(),
				item: new InMemoryItemRepository(),
			};
		}
	}

	private injectServices() {
		if (!this.services) {
			this.services = { cart: new CartService(this.repositories.cart, this.repositories.item) };
		}
	}

	private injectControllers() {
		if (!this.controllers) {
			this._controllers = { cart: new CartController(this.services.cart) };
		}
	}
}

export const container = new Container();
