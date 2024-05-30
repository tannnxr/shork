import { Client, ClientOptions, PermissionFlagsBits } from "discord.js";
import { registerEvents } from "./events/register";
import { getCommandFiles } from "./utils/commands";
import { CommandReferenceType } from './registerCommands';

import { Logger, LogType } from "./utils/logging";

class Shork extends Client {
	eventsRegistered: string[];
	commandsRegistered: CommandReferenceType[];
	logger: Logger
	constructor (options: ClientOptions) {
		super(options);

		this.logger = new Logger(__filename, LogType.DEBUG)
		this.eventsRegistered = [];
		this.commandsRegistered = [];

		this.registerEvents();
		this.registerCommands();

		return this
	}

	async registerEvents() {
		const eventsOr = await registerEvents(this)
		if (eventsOr == false) {
			this.logger.log(`Events unable to be registered for some reason.`, LogType.ERROR)
			throw new Error("Fatal error: Events not registered.")
		}

		this.eventsRegistered = eventsOr as string[];

	}

	async registerCommands() {
		const commandFiles = await getCommandFiles()

		commandFiles.forEach(async (file) => {
			this.logger.log(file)
			const cmdFile = await import(file);
			const importedCmd = cmdFile.default as CommandReferenceType;
			console.log(importedCmd)
			if (importedCmd.data !== null && importedCmd.execute !== null) {
				this.commandsRegistered.push(importedCmd);
			}
		})

		this.logger.log(`Commands Registered (${this.commandsRegistered.length})`);
	}

	getRegisteredEvents() {
		return {events: this.eventsRegistered, count: this.eventsRegistered.length}
	}

	getRegisteredCommands() {
		const commands: string[] = []
		this.commandsRegistered.forEach((command) => {
			commands.push(command.data.name)
		})
		return {commands: commands, count: commands.length}
	}
}

export {Shork};