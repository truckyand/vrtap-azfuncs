const axios = require('axios').default;
const fs = require('fs/promises');

// 
//  
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

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}


async function click_list(myTimer, context) {
    context.log("Click for result_success.json...");

    try {
        // Ready proxy list
        context.log(`Ready proxy list...`);
        var resultList = require('./result_success.json');
        context.log(`Result found: ${resultList.length}`);
    }
    catch (ex) {
        context.log(`Cannot read proxy list. ${ex.message}`);
        
        context.log(ex);
    }

    // 
    var result = [];
    await asyncForEach(resultList, async r => {

        var x = await click_friend(context, r);

        if (x.error) {
            r.lastUpdate = "error";
            r.lastUpdateError = x.error;
        }
        else {
            r.lastUpdate = "success";
            r.lastUpdateError = null;

            r.energy = x.energy;
            r.balance = x.balance;
            r.earned = x.earned;
            r.dailyRewardClaimable = x.dailyRewardClaimable;
        }

        result.push(r);

    });

    //
    fs.writeFile('result_success2.json', JSON.stringify(result));


}

const CLICK_MIN = 58;
const CLICK_MAX = 88;
async function click_friend(context, r) {
    try {
        var proxy = {
            host: r.proxy.split(":")[0],
            port: r.proxy.split(":")[1]
        };

        var click_data = {
            clickCount: Math.round(Math.random() * (CLICK_MAX - CLICK_MIN) + CLICK_MIN),
            timestamp: Date.now()
        };

        const url = `https://api.victoriavr.com/api/v1/user/${r.userId}/click`;

        var resp = await axios.post(url, click_data, { proxy: proxy });
        context.log(`Click: ${click_data.clickCount} / userId: ${r.userId} / proxy: ${r.proxy}`);
        context.log(`\t${resp.statusText} / click: ${click_data.clickCount} / energy: ${resp.data.energy} / balance: ${resp.data.balance} / earned: ${resp.data.earned}`);

        return resp.data;
    }
    catch (e) {
        context.log(e);
        return { "error": e };
    }
}

///
///
///
module.exports = click_list;
