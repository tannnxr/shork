import {
	BaseInteraction,
	ChatInputCommandInteraction,
	Events,
	InteractionType,
	TextChannel,
} from "discord.js";
import { Shork } from "../../Shork";
import { getChannel } from "../../utils/channel";
import { shorkCache } from "../../db/cache";
import { CommandReferenceType } from "../../registerCommands";

import { getCommandFiles } from "../../utils/commands";

export default {
	name: Events.InteractionCreate,
	execute: async (interaction: BaseInteraction) => {
		const client = interaction.client as Shork;
		if (interaction.type == InteractionType.ApplicationCommand) {
			const chatInteraction = interaction as ChatInputCommandInteraction;
			const registeredCommands = await client.getRegisteredCommands();
			if (registeredCommands.count < 1) {
				(interaction as ChatInputCommandInteraction).reply(
					"Looks like there aren't any commands registered!!!"
				);
			}

			registeredCommands.commands.forEach((command: CommandReferenceType) => {
				if (chatInteraction.commandName === command.data.name) {
					command.execute(chatInteraction);
				}
			});
		}
	},
};
