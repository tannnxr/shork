import { Shork } from "./Shork";
import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { Logger, LogType } from "./utils/logging";

dotenv.config();

const logger = new Logger(__filename, LogType.DEBUG);

const SHORK = new Shork({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

process.on('exit', (errCode) => {
	logger.log(`Process Exiting (${errCode})`, LogType.ERROR);
})

export const rootDir = __dirname;

SHORK.login(process.env.TOKEN);