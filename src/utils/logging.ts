import chalk from 'chalk';

enum LogType {
	DEBUG = "debug",
	SUCCESS = "success",
	ERROR = "error",
	WARN = "warn",
}

class Logger {
	filename: string | Buffer;
	defaultType: LogType;
	ColorMap: Map<string, chalk.ChalkFunction>

	constructor(filename: string | Buffer, defaultType: LogType) {
		if (filename === undefined) {new Error('[Logger]: \'filename\' is a required parameter, but missing.')}
		this.filename = filename;
		this.defaultType = defaultType;
		this.ColorMap = new Map([
			['success', chalk.green],
			['debug', chalk.magenta],
			['warn', chalk.yellow],
			['error', chalk.red],
		])
	}

	log(message: string, logType?: LogType) {
		const splitName = this.filename.toString().split('\\')
		const editedFilename = splitName[splitName.length -1]
		const logMessage = `[${editedFilename}] (${logType ? logType : this.defaultType}) $ ${message}`
		let mappedColor = this.ColorMap.get(logType ? logType : this.defaultType)
		if (mappedColor === undefined) return;
		console.log(mappedColor(logMessage));
	}
}

export {Logger, LogType}