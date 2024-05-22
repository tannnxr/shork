import { BaseInteraction, Events, InteractionType, TextChannel } from "discord.js";
import { Shork } from "../../Shork";
import { getChannel } from "../../utils/channel";

import { getCommandFiles } from "../../utils/commands";

export default {
    name: Events.InteractionCreate,
    execute: (interaction: BaseInteraction) => {
        if (interaction.type == InteractionType.ApplicationCommand) {
            getCommandFiles()
        }
    }
}