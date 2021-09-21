const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const axios = require('axios');

const app = express();

let message = "This is a message"; 

const schema = buildSchema(`

type Post {
    userId: Int
    id: Int
    title: String
    body: String
}

type User {
    name: String
    age: Int
    college: String
}

type Query {
        hello: String
        welcomemessage(name: String): String
        getUser: User
        getUsers: [User]
        getPostsFromExternalAPI: [Post]
        message: String
}

type Mutation {
    setMessage(newMessage: String): String
    createUser(name: String!, age: Int!, college: String!): User
}

`);


const root = {
    hello: () => {
        return 'Hello World'
    },

    welcomemessage: (args) =>{
        console.log(args)
        return `Hey ${args.name}, How are you`
    },

    getUser: () =>{
        const user = {
            name : "Vishnu Moger",
            age: 32,
            college : 'SKIT Bangalore'
        };

        return user;
    },

    getUsers: () =>{
        const users = [{
            name : "Vishnu Moger",
            age: 32,
            college : 'SKIT Bangalore'
        },
        {
            name : "truly mittal",
            age: 23,
            college : 'IIT Madras'
        }]

        return users;   
    },

    getPostsFromExternalAPI: async() =>{
        /*Promise*/
        /*const getPosts = axios.get('https://jsonplaceholder.typicode.com/posts').then(result =>result.data);
        return getPosts;*/

        /* Async await */
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return result.data;
    },

    setMessage: ({newMessage}) =>{
        message = newMessage;
        return message;
    },

    message: () => message,

    createUser: ({name, age, college}) => {
        //create a new user inside the db
        return {name, age, college}
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
})); 
//http://localhost:4000/graphql

app.listen(4000, ()=> console.log(`graphQL server on port 4000`));
