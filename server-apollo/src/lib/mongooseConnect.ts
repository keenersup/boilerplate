import mongoose from 'mongoose'
import {MONGO_URI, MONGO_OPTIONS} from '../config'

const {} = process.env

const connect = () => {
    return mongoose.connect(MONGO_URI , MONGO_OPTIONS)
}


 const mongooseConnect = () => {
    connect()
    const db = mongoose.connection

    db.on('error', () => {
        console.error.bind(console, 'DB error: ')
        setInterval(() => {
            connect()
        }, 5000)
    })
    db.once('open', () => {
        console.log('    DB connect');
    })
    db.on('disconnected', () => {
        console.error('    DB reconnect')
        setInterval(() => {
            connect()
        }, 5000)
    })
}

export default mongooseConnect
