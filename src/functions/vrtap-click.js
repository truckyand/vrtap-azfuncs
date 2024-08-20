// https://github.com/Azure/azure-functions-nodejs-samples/blob/main/js/src/functions/timerTrigger1.js
const axios = require('axios').default;

// 
// Axios config 
//
var headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    "content-type": "application/json",
    "dnt": 1,
    "origin": "https://game.victoriavr.com",
    "priority": "u=1, i",
    "referer": "https://game.victoriavr.com/",
    "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Windows",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
};
axios.defaults.headers = headers;


// Config
//
const MIN = 8;
const MAX = 30;

const userId = "ffe70c88-5ca3-4e9a-8b0e-e0f77f6ea5d2";
const url = `https://api.victoriavr.com/api/v1/user/${userId}/click`;

//
async function click(myTimer, context) {
    try {
        var click_data = {
            clickCount: Math.round(Math.random() * (MAX - MIN) + MIN),
            timestamp: Date.now()
        };
        var resp = await axios.post(url, click_data);
        context.log(`${resp.statusText} / click: ${click_data.clickCount} / energy: ${resp.data.energy} / balance: ${resp.data.balance} / earned: ${resp.data.earned}`);
    }
    catch (e) {
        context.log(e);
    }
}

module.exports = click;