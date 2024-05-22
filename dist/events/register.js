"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvents = void 0;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
async function bindEvent(client, eventPath) {
    let eventModule;
    try {
        eventModule = await Promise.resolve(`${eventPath}`).then(s => __importStar(require(s)));
    }
    catch (error) {
        console.error(`Failed to import ${eventPath}:`, error);
        return false;
    }
    const event = eventModule.default;
    if (event && event.name && event.execute) {
        client.addListener(event.name, event.execute);
        console.log(`Registered event: ${event.name}`);
        return true;
    }
    else {
        console.warn(`The file ${eventPath} is not an event, or is structured incorrectly.`);
        return false;
    }
}
async function getFilesRecursively(directory) {
    const files = await (0, promises_1.readdir)(directory);
    const filePaths = await Promise.all(files.map(async (file) => {
        const filePath = path_1.default.join(directory, file);
        const fileStat = await (0, promises_1.stat)(filePath);
        if (fileStat.isDirectory()) {
            return getFilesRecursively(filePath);
        }
        else {
            return filePath;
        }
    }));
    return filePaths.flat();
}
const registerEvents = async (client) => {
    console.log("Registering Events...");
    try {
        const allFiles = await getFilesRecursively(__dirname);
        console.log("All files:", allFiles);
        const filtered = allFiles.filter(file => (file.endsWith('.js') || file.endsWith('.ts')) && !file.endsWith('.d.ts'));
        console.log("Filtered files:", filtered);
        let eventCount = 0;
        for (const file of filtered) {
            console.log("Processing file:", file);
            const success = await bindEvent(client, file);
            if (success) {
                eventCount++;
            }
        }
        console.log("Total events registered:", eventCount);
        return true;
    }
    catch (err) {
        console.error("Error registering events:", err);
        return false;
    }
};
exports.registerEvents = registerEvents;
