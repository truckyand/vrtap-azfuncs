
app.http('test1', {
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