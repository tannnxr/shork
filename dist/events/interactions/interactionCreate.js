"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const commands_1 = require("../../utils/commands");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    execute: (interaction) => {
        if (interaction.type == discord_js_1.InteractionType.ApplicationCommand) {
            (0, commands_1.getCommandFiles)();
        }
    }
};
