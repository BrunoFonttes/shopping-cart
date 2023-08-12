import { NextFunction, Request, Response } from "express";
import { logger } from "../../infra/logger";

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	logger.error(err.message);

	if (res.headersSent) {
		return next(err);
	}

	res.status(500).send("Internal Server Error");
};
