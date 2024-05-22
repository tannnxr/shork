import { Client } from "discord.js";
import { readdir, stat } from "fs/promises";
import path from "path";
import { ShorkEvent } from "./event";

async function bindEvent(client: Client, eventPath: string): Promise<boolean> {
    let eventModule: ShorkEvent;

    try {
        eventModule = await import(eventPath);
    } catch (error) {
        console.error(`Failed to import ${eventPath}:`, error);
        return false;
    }

    const event = eventModule.default;

    if (event && event.name && event.execute) {
        client.addListener(event.name, event.execute);
        return true;
    } else {
        console.warn(`The file ${eventPath} is not an event, or is structured incorrectly.`);
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

export const registerEvents = async (client: Client): Promise<boolean> => {
    console.log("Registering Events...");
    try {
        const allFiles = await getFilesRecursively(__dirname);

        const filtered = allFiles.filter(file => (file.endsWith('.js') || file.endsWith('.ts')) && !file.endsWith('.d.ts'));

        let eventCount = 0;
        for (const file of filtered) {
            const success = await bindEvent(client, file);
            if (success) {
                eventCount++;
            }
        }
        console.log(`Registered Events (${eventCount})`);
        return true;
    } catch (err) {
        console.error("Error registering events:", err);
        return false;
    }
};
