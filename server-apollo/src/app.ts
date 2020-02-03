import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import {APOLLO_OPTIONS} from './config'
import {addUser} from "./lib/addUser";
import models from "./models";
import cors from "cors";

const createApp = () => {
    const app = express()

    const corsOption = {
        origin: process.env.CLIENT_SERVER_URL || 'http://localhost:3000',
        credentials: true,
    }
    app.use(cors(corsOption))

    const server = new ApolloServer({
        ...APOLLO_OPTIONS,
        typeDefs,
        resolvers,
        schemaDirectives,
        context: ({req, res}) => {
            const user = addUser(req, res)
            return {
                models,
                user: user,
            }
        }
    })

    server.applyMiddleware({
        app,
        path: `/${process.env.GRAPHQL_PATH || 'graphql'}`,
        cors: false,
    })

    return {app, server}
}

export default createApp