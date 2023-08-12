import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../core/logger";
import { ResourceNotFoundException } from "../../domain/errors/resourceNotFoundException";
import { ValidationError } from "../../domain/errors/validationError";

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	logger.error(err.message);

	if (res.headersSent) {
		return next(err);
	}

	if (err) {
		if (err instanceof ResourceNotFoundException) {
			return res.status(StatusCodes.NOT_FOUND).json({ details: err.message });
		}

		if (err instanceof ValidationError) {
			return res.status(StatusCodes.BAD_REQUEST).json({ details: err.validationErrors });
		}
	}

	res.status(500).send("Internal Server Error");
};
