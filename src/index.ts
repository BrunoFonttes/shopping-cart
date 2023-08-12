import express from "express";

import rTracer from "cls-rtracer";
import morgan from "morgan";
import { envs } from "./config/env.factory";
import { Container } from "./container";
import { logger } from "./infra/logger";
import { authHandler, errorHandler } from "./presentation/middlewares";

const { controllers } = new Container();

export const app = express();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
morgan.token("request-id", function (_req, _res) {
	return rTracer.id() as string;
});

app.use(rTracer.expressMiddleware());
app.use(
	morgan(
		`[${envs.serviceName}] :method :url :status :res[content-length] - :response-time ms [:request-id]`,
	),
);

app.use(express.json({ limit: "50kb" }));

app.get("/health", (_req, res) => {
	return res.status(200).send("ok");
});

app.use(authHandler);

app.post("/cart", controllers.cart.addOrUpdateItems);
app.delete("/cart/item/:itemId", controllers.cart.removeItem);
app.get("/cart", controllers.cart.get);

app.use(errorHandler);

export const server = app.listen(envs.port, () => {
	logger.info(`server listening at port ${envs.port}`);
});

/**
 * Simple graceful shutdown
 */
process.on("SIGTERM", () => {
	logger.info("SIGTERM signal received.");
	logger.info("closing http server.");
	server.close(() => {
		logger.info("http server closed.");
		process.exit(0);
	});
});
