import express from "express";

import rTracer from "cls-rtracer";
import morgan from "morgan";
import { envs } from "./config/env.factory";
import { logger } from "./core/logger";
import { cartRouter } from "./presentation/controllers/cart.router";
import { authHandler, errorHandler } from "./presentation/middlewares";

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
app.use("/api/v1", cartRouter);
app.use(errorHandler);
app.all("*", function (_req, res) {
	return res.status(404).send();
});

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
