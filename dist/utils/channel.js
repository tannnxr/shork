"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = void 0;
const getChannel = (client, channelId) => {
    return client.channels.cache.filter((channel) => channel.id == channelId).get(channelId);
};
exports.getChannel = getChannel;
