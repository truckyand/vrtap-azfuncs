
const { app, output } = require('@azure/functions');
const axios = require('axios').default;

const { faker } = require('@faker-js/faker');

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

//
//
//

app.http('createNewFriend', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}". Invocation ID: "${context.invocationId}`);

        //
        

        //
        const name = request.query.get('name') || (await request.text()) || 'world';
        return { body: `Hello, ${name}!` };
    },
});

//
//
async function createNewFriend(request, context) {
    try {

        var refCode = "6cja8HpT5gClxBVw";
        var username =  faker.internet.userName();

        const MIN = 1000000000;
        const MAX = 9000000000;
        // current      =>    1777555384
        // Date.now()   => 1724124430333
        var newId = Math.floor(Math.random() * MIN) + MAX;

        var url = `https://api.victoriavr.com/api/v1/user/${newId}?referralCode=${refCode}&username=${username}`;
        context.log(`Requesting ${url}...`);

        var resp = await axios.get(url);
        context.log(`${resp.statusText} / energy: ${resp.data.energy} / balance: ${resp.data.balance} / earned: ${resp.data.earned} / newUser: ${resp.data.newUser} `);
    }
    catch (e) {
        context.log(e);
    }
}
