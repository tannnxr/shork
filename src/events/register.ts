import { Client } from "discord.js";
import { readdir, stat } from "fs/promises";
import path from "path";
import { ShorkEvent } from "./event";
import { Shork } from "../Shork";
import { LogType, Logger } from "../utils/logging";

const logger = new Logger(__filename, LogType.DEBUG)

async function bindEvent(client: Shork, eventPath: string): Promise<boolean> {
    let eventModule: ShorkEvent;

    try {
        eventModule = await import(eventPath);
    } catch (error) {
        logger.log(`Failed to import ${eventPath}:`, LogType.ERROR);
        return false;
    }

    const event = eventModule.default;

    if (event && event.name && event.execute) {
        client.addListener(event.name, event.execute);
        return true;
    } else {
        logger.log(`The file ${eventPath} is not an event, or is structured incorrectly.`, LogType.WARN);
        return false;
    }
}

async function getFilesRecursively(directory: string): Promise<string[]> {
    const files = await readdir(directory);
    const filePaths = await Promise.all(files.map(async (file) => {
        const filePath = path.join(directory, file);
        const fileStat = await stat(filePath);
        if (fileStat.isDirectory()) {
            return getFilesRecursively(filePath);
        } else {
            return filePath;
        }
    }));
    return filePaths.flat();
}

export const registerEvents = async (client: Shork): Promise<string[] | boolean> => {
    logger.log("Registering Events...");
    try {
        const allFiles = await getFilesRecursively(__dirname);

        const filtered = allFiles.filter(file => (file.endsWith('.js') || file.endsWith('.ts')) && !file.endsWith('.d.ts'));

        let events = []
        for (const file of filtered) {
            const success = await bindEvent(client, file);
            if (success) {
                events.push(file)
            }
        }
        logger.log(`Registered Events (${events.length})`, LogType.SUCCESS);
		client.eventsRegistered = events;
        return events
    } catch (err) {
        logger.log("Error registering events:", LogType.ERROR);
        return false;
    }
};
