// bot.test.js
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config()

describe('Bot Login', () => {
  test('should log in successfully', async () => {
    // Create a mock client with real login method
    const mockClient = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    // Call the actual login method with the provided token
    const loginResult = await mockClient.login(process.env.TOKEN);

    // Assert that the login was successful
    expect(loginResult).toBeTruthy();
  });
});
