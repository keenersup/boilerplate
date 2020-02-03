import mongooseConnect from './lib/mongooseConnect'
import createApp from "./app";
import { SERVER_PORT, SERVER_HOST } from './config';

(() => {
    const {app} = createApp()

    try {
        app.listen({port: SERVER_PORT}, () => {
            console.log(`🚀  Server ready at ${SERVER_HOST}:${SERVER_PORT} `)
        })
        mongooseConnect()
    } catch (err) {
        console.error(`server error: ${err}`)
    }
})()