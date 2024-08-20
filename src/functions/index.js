const { app } = require('@azure/functions');
const vrtap_click = require('./vrtap-click');
const vrtap_createNewFriend = require('./vrtap-create-friends');
const vrtap_click_friend = require('./vrtap-click-friends');

//
app.timer('vrtap-click-truckyand', {
    schedule: '*/15 * * * * *',
    handler: async (myTimer, context) => {
        context.log(`Enter vrtap-click-truckyand. Invocation ID: "${context.invocationId}"`);

        //await vrtap_click(myTimer, context);
    }
});

//
app.timer('vrtap-click-friends', {
    schedule: '*/15 * * * * *',
    handler: async (myTimer, context) => {
        context.log(`Enter vrtap-click-friends. Invocation ID: "${context.invocationId}"`);

        await vrtap_click_friend(myTimer, context);
    }
});

app.http('createNewFriend', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}". Invocation ID: "${context.invocationId}`);

        //
        await vrtap_createNewFriend(request, context);

        //
        const name = request.query.get('name') || (await request.text()) || 'world';
        return { body: `Hello, ${name}!` };
    },
});

