import path from "path";
import fs from 'fs';
import { rootDir } from "../main";
import { LogType, Logger } from "./logging";
import { shorkCache } from "../db/cache";

import { getFilesRecursively } from "./files";

const logger = new Logger(__filename, LogType.DEBUG)

export async function getCommandFiles() {
    const cmdDir = path.join(rootDir, 'commands')
	if (!fs.existsSync(cmdDir)) {
		logger.log(`Directory '${cmdDir}' does not exist. Failing.`, LogType.ERROR)
		process.exit()
	}

	const commandFiles = await getFilesRecursively(cmdDir)

	const filteredCommands = commandFiles.filter(file => (file.endsWith('.js') || file.endsWith('.ts')) && !file.endsWith('.d.ts'));

	shorkCache.set('commandFiles', JSON.stringify(filteredCommands))
}