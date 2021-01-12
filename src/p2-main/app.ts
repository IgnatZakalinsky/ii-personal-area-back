import {Express, NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {cookie} from './cookie'

export const appUse = (app: Express) => {
    cookie(app)

    // parse application/json
    app.use(bodyParser.json({limit: '7mb'}))
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: '7mb', extended: false}))

    // log middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log('-----------------------------------------------------------------------------')
        console.log('Time: ', new Date().toString()) // need log always
        console.log('-----', req.method, req.url) // need log always
        console.log('query:', req.query) // need log always
        console.log('body:', req.body) // need log always
        console.log('cookies:', req.cookies) // need log always
        // log('headers:', req.headers)
        // log('rawHeaders:', req.rawHeaders)
        next()
    })
}
