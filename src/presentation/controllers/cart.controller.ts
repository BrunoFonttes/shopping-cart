import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../core/logger";
import { CartServicePort } from "../../domain/ports/services/cart.service.port";
import { CartDTO } from "../dtos/cart.dto";

/**
 * For application exceptions in general, as we have more exceptions, we could implement
 * a more structured error containing a code like Error{ name, details, code, stacktrace(only for non production environments) }
 */
export class CartController {
	constructor(private cartService: CartServicePort) {}

	addOrUpdateItems = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { itemId, amount } = req.body;

			/**
			 * as the application grows, for request validations, we could use jsonschema lib
			 */
			if (isNaN(Number.parseInt(itemId))) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ details: "req.body: itemId is required and must be an integer" });
			}

			if (isNaN(Number(amount))) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ details: "req.body: amount is required and must be a number" });
			}

			const responseOrError = await this.cartService.addOrUpdateItem(
				req.userId,
				Number.parseInt(itemId),
				Number(amount),
			);

			if (responseOrError.isFailure()) {
				throw responseOrError.value;
			}

			return res.status(StatusCodes.NO_CONTENT).send();
		} catch (e) {
			return next(e);
		}
	};

	removeItem = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { itemId } = req.params;

			if (isNaN(Number.parseInt(itemId))) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ details: "req.params: itemId must be an integer" });
			}

			const responseOrError = await this.cartService.removeItem(
				req.userId,
				Number.parseInt(itemId),
			);

			if (responseOrError.isFailure()) {
				throw responseOrError.value;
			}

			return res.status(StatusCodes.NO_CONTENT).send();
		} catch (e) {
			return next(e);
		}
	};

	get = async (req: Request, res: Response, next: NextFunction) => {
		try {
			logger.info("getting cart");

			const responseOrError = await this.cartService.getCart(req.userId);

			if (responseOrError.isFailure()) {
				throw responseOrError.value;
			}

			const { userId, ...response } = responseOrError.value;

			const carDTO: CartDTO = {
				items: Object.values(response.items),
				totalPrice: response.totalPrice,
			};

			return res.status(StatusCodes.OK).json(carDTO);
		} catch (e) {
			return next(e);
		}
	};
}
