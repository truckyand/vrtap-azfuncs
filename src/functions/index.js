const { app } = require('@azure/functions');
const vrtap_click =require('./vrtap-click');
const vrtap_createNewFriend =require('./vrtap-friends');

//
app.timer('vrtap-click-abc', {
    schedule: '*/15 * * * * *',
    handler: async (myTimer, context) => {
        context.log(`Enter vrtap-click-abc. Invocation ID: "${context.invocationId}"`);
        //return { hello: 'world' }

        //await vrtap_click(myTimer, context);
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


app.http('test3', {
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