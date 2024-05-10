import { Client, Events, TextChannel } from "discord.js";
import { getChannel } from "../../utils/channel";

export default {
    name: Events.ClientReady,
    execute: (client: Client) => {
        console.log("Client is ready.")
        const logChannel = getChannel(client, '1195155705133535271');
        logChannel.send("online")
    }
}