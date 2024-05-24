import { Client, ClientOptions, PermissionFlagsBits } from "discord.js";
import { registerEvents } from "./events/register";


class Shork extends Client {
	eventsRegistered: number;
	constructor (options: ClientOptions) {
		super(options);
		this.eventsRegistered = 0;

		this.registerEvents()

		return this
	}

	registerEvents() {
		registerEvents(this)
	}

	getRegisteredEvents() {
		return this.eventsRegistered;
	}
}

export {Shork};