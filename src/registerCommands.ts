import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { clientId, guildId } from './config.json';
import { ChatInputCommandInteraction } from 'discord.js';

config();

const token = process.env.TOKEN;
if (!token) {
    throw new Error('TOKEN is not defined in the environment variables.');
}

const commands = [] as any[];

const foldersPath = path.join(__dirname, 'commands');
console.log(foldersPath)
const commandFolders = fs.readdirSync(foldersPath);

interface Command {
    data: any; // Adjust this to match the type of data
    execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command: Command = require(filePath).default; // Use .default to import the default export
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data: any = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
