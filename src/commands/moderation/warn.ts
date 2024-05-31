import {
	ChatInputCommandInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
	SlashCommandMentionableOption,
	SlashCommandStringOption,
} from "discord.js";
import { LogType, Logger } from "../../utils/logging";

import { shorkCache } from "../../db/cache";

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
	)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

	async execute(interaction: ChatInputCommandInteraction) {
		const logger = new Logger(__filename, LogType.DEBUG);

		const options = interaction.options;
		const member = options.getMentionable("user");
		const reason = options.getString("reason");

		if (await shorkCache.hGetAll('warnings')) { 
			await shorkCache.hSet('warnings', {})
		}

		const warnings = await shorkCache.hGetAll('warnings')

		console.log(warnings)
	},
};
