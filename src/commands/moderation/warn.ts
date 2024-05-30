import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandMentionableOption,
  SlashCommandStringOption,
} from "discord.js";
import { LogType, Logger } from "../../utils/logging";

export default {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addMentionableOption((option) =>
      option
        .setName("user")
        .setDescription("The user to warn.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason you're warning the user for")
        .setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const logger = new Logger(__filename, LogType.DEBUG);

    logger.log("warn command");
  },
};
