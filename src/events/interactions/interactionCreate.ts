import {
  BaseInteraction,
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
    }
  },
};
