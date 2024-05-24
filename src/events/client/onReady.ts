import { Client, EmbedBuilder, Events, TextChannel } from "discord.js";
import { getChannel } from "../../utils/channel";
import { Shork } from "../../Shork";
import { LogType, Logger } from "../../utils/logging";

export default {
  name: Events.ClientReady,
  execute: (client: Shork) => {
	const logger = new Logger(__filename, LogType.DEBUG)
    logger.log("Client is ready.");
    const logChannel = getChannel(client, "1243357415852867604");
    const clientReadyAt = client.readyAt;
    const embed = new EmbedBuilder()
      .setTitle(`${client.user?.displayName} | ${client.user?.id}`)
      .addFields(
        { name: "Events", value: `${client.getRegisteredEvents()}`, inline: true },
        {
          name: "readyAt",
          value: `${clientReadyAt?.getHours()}:${clientReadyAt?.getMinutes()}`,
          inline: true,
        }
      );
    logChannel.send({ embeds: [embed] });
  },
};
