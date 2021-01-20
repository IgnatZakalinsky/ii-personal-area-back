import express from 'express'
import {appUse} from './p2-main/app'
import {routes} from './p2-main/routes'
import {useMongo} from './p2-main/mongo'
import {PORT} from './p0-config/config'
import {globalCatch} from './p1-common/c1-errors/errors'

const app = express()

appUse(app)
routes(app)
useMongo(() => {
    app.listen(PORT, () => {
        console.log('ii-personal-area-back listening on port: ' + PORT)

        // throw new Error('test')
    })
})

globalCatch()
