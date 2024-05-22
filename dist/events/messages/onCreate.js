"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const bad_words_next_1 = __importDefault(require("bad-words-next"));
const badWordsEn = require('bad-words-next/data/en.json');
const cld = require('cld');
function isProfane(messageContent) {
    const filter = new bad_words_next_1.default({ data: badWordsEn });
    return filter.check(messageContent);
}
function isElligibleForXp(messageContent) {
    if (messageContent.length < 10)
        return false;
    if (isProfane(messageContent))
        return false;
    return true;
}
async function isEnglish(messageContent) {
    //const result = await cld.detect(messageContent)
    //console.log(result)
    return true;
}
exports.default = {
    name: discord_js_1.Events.MessageCreate,
    execute: async (message) => {
        if (message.author.bot)
            return;
        if (await isEnglish(message.content) == false) {
            if (message.deletable) {
                const author = message.author;
                const content = message.content;
                const embed = new discord_js_1.EmbedBuilder({
                    title: "Auto Moderation",
                    description: "Your message was flagged because it is not in English.\n`Rule 12 - Use English only.`",
                    fields: [
                        {
                            name: 'Message Content',
                            value: content
                        }
                    ]
                });
                try {
                    await author.send({ embeds: [embed] }).then(() => {
                        console.log("Message automoderated");
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        const messageElligible = isElligibleForXp(message.content);
        console.table({
            author: message.author.username,
            content: message.content,
            isElligible: messageElligible
        });
    }
};
