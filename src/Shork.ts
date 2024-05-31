import { Client, ClientOptions, PermissionFlagsBits } from "discord.js";
import { registerEvents } from "./events/register";
import { getCommandFiles } from "./utils/commands";
import { CommandReferenceType } from "./registerCommands";

import { Logger, LogType } from "./utils/logging";

// Import custom errors

import { InvalidTokenError, EventRegistrationError } from "./Errors";

class Shork extends Client {
	eventsRegistered: string[];
	commandsRegistered: CommandReferenceType[];
	logger: Logger;
	constructor(options: ClientOptions) {
		super(options);

		this.logger = new Logger(__filename, LogType.DEBUG);
		this.eventsRegistered = [];
		this.commandsRegistered = [];
		return this;
	}

	async registerEvents() {
		const eventsOr = await registerEvents(this);
		if (eventsOr == false) {
			this.logger.log(
				`Events unable to be registered for some reason.`,
				LogType.ERROR
			);
			throw new EventRegistrationError("Events failed to register.");
		}
		this.eventsRegistered = eventsOr as string[];
	}

	async registerCommands() {
		const commandFiles = await getCommandFiles();
		for (const file of commandFiles) {
			this.logger.log(file);
			const cmdFile = await import(file);
			const importedCmd = cmdFile.default as CommandReferenceType;
			if (importedCmd.data !== undefined && importedCmd.execute !== null) {
				this.commandsRegistered.push(importedCmd); // Correctly push the command
			}
		}
		this.logger.log(`Commands Registered`, LogType.SUCCESS);
	}

	getRegisteredEvents() {
		return {
			events: this.eventsRegistered,
			count: this.eventsRegistered.length,
		};
	}

	async getRegisteredCommands() {
		return { commands: this.commandsRegistered, count: this.commandsRegistered.length };
	}

	async start(): Promise<boolean> {
		const token = process.env.TOKEN;
		if (token === undefined) throw new InvalidTokenError("Check environment variables.");
		this.logger.log("Shork starting", LogType.DEBUG);
		try {
			await this.registerCommands();
			await this.registerEvents();
			await this.login(token);
			return true;
		} catch (error) {
			this.logger.log(`Error with starting: ${error}`, LogType.ERROR);
			return false;
		}
	}
}

export { Shork };
