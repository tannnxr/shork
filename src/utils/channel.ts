import { channel } from "diagnostics_channel"
import { Client, TextChannel } from "discord.js"

export const getChannel = (client: Client, channelId: string): TextChannel => {
    return client.channels.cache.filter((channel) => channel.id == channelId).get(channelId) as TextChannel
}