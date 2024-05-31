import { Shork } from "./Shork";
import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { Logger, LogType } from "./utils/logging";

dotenv.config();

const logger = new Logger(__filename, LogType.DEBUG);

export const rootDir = __dirname;

const SHORK = new Shork({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});
process.on("exit", (errCode) => {
	logger.log(`Process Exiting (${errCode})`, LogType.ERROR);
});

process.on("unhandledRejection", (reason, promise) => {
	logger.log(`Unhandled Rejection: \n${reason}`);
});

process.on("uncaughtException", (error, origin) => {
	logger.log(`${error}`, LogType.ERROR);
});
(async () => {
	await SHORK.start()
})();
