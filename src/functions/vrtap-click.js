const { app, output } = require('@azure/functions');
const axios = require('axios').default;

// Config
//
const MIN = 8;
const MAX = 30;

const userId = "ffe70c88-5ca3-4e9a-8b0e-e0f77f6ea5d2";
const url = `https://api.victoriavr.com/api/v1/user/${userId}/click`;


//
app.timer('vrtap-click-abc', {
    schedule: '0 */5 * * * *',
    handler: async (myTimer, context) => {
        context.log(`Enter vrtap-click-abc. Invocation ID: "${context.invocationId}"`);
        //return { hello: 'world' }

        await click(myTimer, context);
    }
});

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