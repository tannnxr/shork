import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { registerEvents } from "./events/register";

dotenv.config();

const SHORK = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

registerEvents(SHORK)


SHORK.login(process.env.TOKEN)