import {ConnectionOptions} from "mongoose";

// const ONE_DAY = 1000 * 60 * 60 * 24

export const {
    NODE_ENV = 'development',

    MONGO_HOST = 'mongodb',
    MONGO_PORT = 27017,
    MONGODB_DATABASE = 'database',
    MONGODB_USERNAME = 'username',
    MONGODB_PASSWORD = 'password',

    SECRET_KEY = 'secret_key',
    SERVER_PORT = 4000,
    SERVER_HOST = 'http://localhost',

    REFRESH_SECRET_KEY = 'refresh_secret_key',
    ACCESSTOKEN_EXPIRED = '30m',
    REFRESHTOKEN_EXPIRED = '1d',
    /*
        SESS_NAME = 'sid',
        SESS_SECRET = 'ssh!secret!',
        SESS_LIFETIME = ONE_DAY,

        REDIS_HOST = 'localhost',
        REDIS_PORT = 6379,
        REDIS_PASSWORD = 'secret'
    */
} = process.env

export const IN_PROD = NODE_ENV === 'production'

// Password URL encoded to escape special characters

export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGODB_DATABASE}`
export const MONGO_OPTIONS: ConnectionOptions = {
    user: MONGODB_USERNAME,
    pass: MONGODB_PASSWORD,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
}

export const APOLLO_OPTIONS = {
    playground: IN_PROD
        ? false
        : {
            settings: {
                'request.credentials': 'include'
            }
        }
}


/*

export const REDIS_OPTIONS = {
    host: REDIS_HOST,
    port: +REDIS_PORT,
    password: REDIS_PASSWORD
    // TODO: retry_strategy
}

export const SESS_OPTIONS = {
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: +SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}

*/
