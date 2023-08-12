import { NextFunction, Request, Response } from "express";
import { envs } from "../../config/env.factory";

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).json({ details: "authorization header is required" });
		}

		if (req.headers.authorization === envs.userToken) {
			req.userId = 1;
		} else {
			return res.status(401).send();
		}

		return next();
	} catch (e) {
		next(e);
	}
};
