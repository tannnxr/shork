"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const channel_1 = require("../../utils/channel");
exports.default = {
    name: discord_js_1.Events.ClientReady,
    execute: (client) => {
        console.log("Client is ready.");
        const logChannel = (0, channel_1.getChannel)(client, "1195155705133535271");
        const clientReadyAt = client.readyAt;
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(`${client.user?.displayName} | ${client.user?.id}`)
            .addFields({ name: "Events", value: `${client.getRegisteredEvents()}`, inline: true }, {
            name: "readyAt",
            value: `${clientReadyAt?.getHours()}:${clientReadyAt?.getMinutes()}`,
            inline: true,
        });
        logChannel.send({ embeds: [embed] });
    },
};
