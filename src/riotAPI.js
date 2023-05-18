require('dotenv/config');
const axios = require('axios');

const apiKey = process.env.RIOT_API_KEY;

async function getpuuid(gameName, tagLine) {
    try {
        const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${apiKey}`;
        const response = await axios.get(url);
        console.log(response.data);
        return response.data.puuid;
    } catch(error) {
        console.log(error.message);
    }
}

async function getLeaderboard() {
    try {
        const url = `https://americas.api.riotgames.com/lor/ranked/v1/leaderboards?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        console.log(error.message);
    }
}

async function getMastersCount() {
    try {
        const masters = await getLeaderboard();
        const mastersCount = masters.players.length;
        return mastersCount;
    } catch(error) {
        console.log(error.message);
    }
}

async function getMasters(count = 10) {
    try {
        if(Number.isInteger(count) === false)
        {
            count = 10;
        }
        let masters = await getLeaderboard();
        masters.players.splice(count);
        return masters;
    } catch(error) {
        console.log(error.message);
    }
}

module.exports = {
    getpuuid,
    getLeaderboard,
    getMastersCount,
    getMasters
};