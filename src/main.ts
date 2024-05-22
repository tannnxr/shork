import { Shork } from "./Shork";
import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config()

const SHORK = new Shork({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})


SHORK.login(process.env.TOKEN)