"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user.')
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageChannels)
        .addMentionableOption(option => option.setName('user')
        .setDescription('The user to warn.')
        .setRequired(true))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason you\'re warning the user for')
        .setRequired(false)),
    async execute(interaction) {
        console.log("test");
    }
};
