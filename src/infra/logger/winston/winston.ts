import rTracer from "cls-rtracer";

import { createLogger, format, transports } from "winston";
import { envs } from "../../../config/env.factory";
import { AllowedLogLevels } from "../../../domain/ports/logger/logger.port";

const { combine, timestamp, printf } = format;

const serviceName = "shopping-cart-api";

const logLevelOptions: Record<AllowedLogLevels, string> = {
	error: "error",
	warn: "warn",
	info: "info",
	debug: "debug",
};

const level = (): string => {
	let logLevel = "";

	if (envs.nodeEnv === "production") {
		logLevel = logLevelOptions.info;
	}

	if (envs.logLevel && logLevelOptions[envs.logLevel as AllowedLogLevels]) {
		logLevel = logLevelOptions[envs.logLevel as AllowedLogLevels];
	}

	return logLevel;
};

const rTracerFormat = printf(info => {
	const requestId = rTracer.id();

	return requestId
		? `[${serviceName}] ${info.timestamp}: ${info.level}: ${info.message}: ${requestId}`
		: `[${serviceName}] ${info.timestamp}: ${info.level}: ${info.message}: -`;
});

export const winstonLogger = createLogger({
	level: level(),
	format: combine(timestamp(), rTracerFormat),
	defaultMeta: { service: "cart-service" },
	transports: [new transports.Console()],
});
