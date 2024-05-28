import { BaseInteraction, Events, InteractionType, TextChannel } from "discord.js";
import { Shork } from "../../Shork";
import { getChannel } from "../../utils/channel";
import { shorkCache } from "../../db/cache";

import { getCommandFiles } from "../../utils/commands";

export default {
    name: Events.InteractionCreate,
    execute: async (interaction: BaseInteraction) => {
        if (interaction.type == InteractionType.ApplicationCommand) {
			const redisCmdFiles = await shorkCache.get('commandFiles')
			if (!redisCmdFiles) {
				getCommandFiles()
			}
			
        }
    }
}