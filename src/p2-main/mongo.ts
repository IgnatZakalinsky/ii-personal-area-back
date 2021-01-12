import mongoose from 'mongoose'
import {destruct, onUncaughtException, onUnhandledRejection} from '../index'

const USER_NAME = process.env.MONGO_DB_USER_NAME || ''
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || ''
const MONGO_DB_URL = process.env.MONGO_DB_URL || ''

export const MONGO_DB_URIS = `mongodb+srv://${USER_NAME}:${PASSWORD}@${MONGO_DB_URL}?retryWrites=true&w=majority`

export const useMongo = (f: Function) => {
    mongoose.connect(MONGO_DB_URIS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(() => {
            console.log('MongoDB connected successfully! —ฅ/ᐠ.̫.ᐟ\\ฅ—')

            f()

            onUncaughtException(() => {
                console.log('log in db')
            })
            onUnhandledRejection(() => {
                console.log('log in db')
            })
        })
        .catch(e => console.log('!!! MongoDB connection error: ', destruct(e), e))
}
