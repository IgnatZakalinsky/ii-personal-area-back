import express from 'express'
import {appUse} from './p2-main/app'
import {routes} from './p2-main/routes'
import {useMongo} from './p2-main/mongo'
import {PORT} from './p0-config/config'

const app = express()

appUse(app)
routes(app)
useMongo(() => {
    app.listen(PORT, () => {
        console.log('ii-personal-area-back listening on port: ' + PORT)

        // throw new Error('test')
    })
})

export const destruct = (e: any) => {
    return typeof e === 'object' ? {...e} : 'not object, '
}

export const onUncaughtException = (f?: Function) => {
    process.on('uncaughtException', (e) => {
        f && f() // log in db

        console.log(`!!! Uncaught Exception${f ? ' with log in db' : ''}: `, destruct(e), e)
    })
}

export const onUnhandledRejection = (f?: Function) => {
    process.on('unhandledRejection', (reason, p) => {
        f && f() // log in db

        console.log(
            `!!! Unhandled Rejection${f ? ' with log in db' : ''}: `,
            reason,
            p.then(x => console.log('!!! then: ', x))
                .catch(e => console.log('!!! catch: ', destruct(e), e))
        )
    })
}

onUncaughtException()
onUnhandledRejection()
