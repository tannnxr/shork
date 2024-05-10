import { Client } from "discord.js";
import { access, constants, readdir } from "fs";
import { ShorkEvent } from "./event";


function bindEvent(client: Client, eventName: string | Buffer) {
    const eventSplit = eventName.toString().split(".")
    if (eventSplit[1] !== "ts") return;
    let event: ShorkEvent = require(`${__dirname}/${eventName.toString()}`);

    if (event.default) {
        client.addListener(event.default.name, event.default.execute)
    }
}

export const registerEvents = (client: Client): Promise<boolean> => {
    console.log("Registering Events...")
    return new Promise<boolean>((resolve, reject) => {
        let eventDirs = readdir(`${__dirname}`, {
            recursive: true
        }, (err, files) => {
            if (err) reject(err);
            let filtered = files.filter((file) =>
                file.toString().endsWith('.ts'))
            filtered.forEach((file) => {
                bindEvent(client, file)
            })
        })
    });
}