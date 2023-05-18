const riotAPI = require('./riotAPI');
const { DiscordAPIError } = require('discord.js');
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

DiscordListener.prototype.handleMessage = function (message) {
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

    if(command === 'nummasters' || command === 'masterscount') {
        this.mastersCount(message);
    }

    if(command === 'masters') {
        this.masters(message, args);
    }
};

DiscordListener.prototype.hello = async function (message) {
    const response = 'Hello, World!';
    
    console.log(response);
    message.channel.send(response);
}

DiscordListener.prototype.puuid = async function (message, args) {
    const apiParams = args.shift().split('#');
    const gameName = apiParams.shift();
    const tagLine = apiParams.shift();
    const puuid = await riotAPI.getpuuid(gameName, tagLine);
    
    let response;

    if(puuid === undefined)
    {
        response = 'Unable to find puuid - account not found';
    } else {
        response = puuid;
    }

    console.log(response);
    message.channel.send(response);
}

DiscordListener.prototype.mastersCount = async function (message) {
    const mastersCount = await riotAPI.getMastersCount();
    let response;
    
    if(mastersCount === undefined) {
        response = 'Unable to determine number of players in Masters';
    } else {
        response = `There are ${mastersCount} players in Masters`;
    }
    console.log(response);
    message.channel.send(response);
}

DiscordListener.prototype.masters = async function (message, args) {
    count = parseInt(args.shift());
    const masters = await riotAPI.getMasters(count);

    let response;

    if(masters === undefined) {
        response = 'Unable to determine the Masters players';
    } else {
        if(args.shift() === 'format') {
            response = JSON.stringify(masters.players, null, '\t');
        } else {
            response = JSON.stringify(masters.players);
        }
    }
    console.log(response);
    message.channel.send(response);
}

module.exports = DiscordListener;