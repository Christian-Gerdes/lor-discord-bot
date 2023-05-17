const { Client, GatewayIntentBits } = require('discord.js');
const DiscordListener = require('./src/discordListener');
require('dotenv/config');

const prefix = process.env.PREFIX;
const discordToken = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions
    ]
});

const bot = new DiscordListener(client);

client.login(discordToken);