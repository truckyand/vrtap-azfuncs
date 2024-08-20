const { app, output } = require('@azure/functions');

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    handler: (myTimer, context) => {
        context.log(`Something has happened. Invocation ID: "${context.invocationId}"`);
        return { hello: 'world' }
    }
});