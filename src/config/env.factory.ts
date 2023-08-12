import { get } from "env-var";

type Envs = {
	port: number;
	userToken: string;
	nodeEnv: string;
	logLevel: string;
	serviceName: string;
};

export const getEnv = (): Envs => {
	if (process.env.NODE_ENV === "test") {
		return {
			port: 5555,
			userToken: "abcdefg",
			nodeEnv: "test",
			logLevel: "debug",
			serviceName: "shopping-cart-api-test",
		};
	}

	return {
		port: get("PORT").required().asInt(),
		userToken: get("USER_TOKEN").required().asString(),
		nodeEnv: get("NODE_ENV").required().asString(),
		logLevel: get("LOG_LEVEL").required().asString(),
		serviceName: get("SERVICE_NAME").required().asString(),
	};
};

export const envs = getEnv();
