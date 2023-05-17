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

module.exports = {
    getpuuid
};