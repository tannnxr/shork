import {
	ChatInputCommandInteraction,
	GuildMember,
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
		const member = options.getMentionable("user") as GuildMember;
		const reason = options.getString("reason");

		/* if (await shorkCache.hGetAll('warnings')) { 
			await shorkCache.hSet('warnings', {})
		} */

		// Timeout user for a small time.

		await member.timeout(5 * 60 * 1000, reason as string)

		if (interaction.isRepliable()) (interaction as ChatInputCommandInteraction).reply(`${member.user.username} has been warned for ${reason}`)
	},
};
