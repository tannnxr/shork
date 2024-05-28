import { createClient, RedisClientType } from "redis";
import { Logger, LogType } from "../utils/logging";
import { callbackify } from "util";

enum RedisEnums {
	ERROR = 'error'
}

const logger = new Logger(__filename, LogType.DEBUG)

export const shorkCache = createClient();

shorkCache.on(RedisEnums.ERROR, (err) => {
	logger.log(`Error: ${err}`)
});

shorkCache.connect()
