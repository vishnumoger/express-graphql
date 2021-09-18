const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const app = express();

const schema = buildSchema(`
type Query {
        hello: String
        welcomemessage(name: String): String
}
`);

const root = {
    hello: () => {
        return 'Hello World'
    },

    welcomemessage: (args) =>{
        console.log(args)
        return `Hey ${args.name}, How are you`
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
})); 
//http://localhost:4000/graphql

app.listen(4000, ()=> console.log(`graphQL server on port 4000`));
