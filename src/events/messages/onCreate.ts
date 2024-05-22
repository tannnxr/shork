import { Client, Events, Message, TextChannel, EmbedBuilder } from "discord.js";
import { getChannel } from "../../utils/channel";
import BadWordsNext from "bad-words-next";

const badWordsEn = require('bad-words-next/data/en.json');
const cld = require('cld')

function isProfane(messageContent: string): boolean {
    const filter = new BadWordsNext({ data: badWordsEn })
    return filter.check(messageContent)
}


function isElligibleForXp(messageContent: string): boolean {
    if (messageContent.length < 10) return false;
    if (isProfane(messageContent)) return false;
    return true;
}

async function isEnglish(messageContent: string): Promise<boolean> {
    //const result = await cld.detect(messageContent)
    //console.log(result)
    return true
}

export default {
    name: Events.MessageCreate,
     execute: async (message: Message) => {
        if (message.author.bot) return;
        if (await isEnglish(message.content) == false) {
            if (message.deletable) {
                const author = message.author
                const content = message.content

                const embed = new EmbedBuilder({
                    title: "Auto Moderation",
                    description: "Your message was flagged because it is not in English.\n`Rule 12 - Use English only.`",
                    fields: [
                        {
                            name: 'Message Content',
                            value: content
                        }
                    ]
                })

                try {
                    await author.send({embeds: [embed]}).then(() => {
                        console.log("Message automoderated")
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        }

        const messageElligible = isElligibleForXp(message.content)
        console.table({
            author: message.author.username,
            content: message.content,
            isElligible: messageElligible
        })
    }
}