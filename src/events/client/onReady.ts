import { Client, EmbedBuilder, Events, TextChannel } from "discord.js";
import { getChannel } from "../../utils/channel";
import { Shork } from "../../Shork";

export default {
  name: Events.ClientReady,
  execute: (client: Shork) => {
    console.log("Client is ready.");
    const logChannel = getChannel(client, "1195155705133535271");
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
