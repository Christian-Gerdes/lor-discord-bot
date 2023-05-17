const riotAPI = require('./riotAPI');
require('dotenv/config');

const prefix = process.env.PREFIX;

function DiscordListener(client) {
    this.client = client;

    client.on('ready', this.handleReady.bind(this));

    client.on('messageCreate', this.handleMessage.bind(this));
}

DiscordListener.prototype.handleReady = function () {
    console.log(`Logged in as ${this.client.user.tag}`);
};

DiscordListener.prototype.handleMessage = async function (message) {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(message.content);

    if(command === 'hello') {
       this.hello(message);
    }

    if(command === 'puuid') {
        this.puuid(message, args);
    }
};

DiscordListener.prototype.hello = async function (message) {
    const response = 'Hello, World!';
    
    console.log(response)
    message.channel.send(response);
}

DiscordListener.prototype.puuid = async function (message, args) {
    const apiParams = args.shift().split('#');
    const gameName = apiParams.shift();
    const tagLine = apiParams.shift();
    const puuid = await riotAPI.getpuuid(gameName, tagLine);
    
    const response = puuid;
    
    console.log(response);
    message.channel.send(response);
}

module.exports = DiscordListener;