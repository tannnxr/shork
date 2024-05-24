import path from "path";
import { LogType, Logger } from "./logging";

const logger = new Logger(__filename, LogType.DEBUG)


export function getCommandFiles() {
    const workingDir = __filename;
	logger.log(`${workingDir}`, LogType.DEBUG)
}