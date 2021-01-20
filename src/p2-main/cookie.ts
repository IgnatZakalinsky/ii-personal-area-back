import cors from 'cors'
import cookieParser from 'cookie-parser'
import {Express, Response} from 'express'
import {IS_DEVELOPER_VERSION} from '../p0-config/config'

export const cookieSettings = IS_DEVELOPER_VERSION ? {} : {sameSite: 'none' as const, secure: true}

export const cookie = (app: Express) => {

    // const whitelist = ['http://localhost:3000', 'http://example2.com']
    const corsOptions = {
        credentials: true,
        origin: (
            origin: string | undefined,
            callback: (err: Error | null, allow?: boolean) => void
        ) => {
            // if(whitelist.includes(origin || ''))
            //     return callback(null, true)
            //
            // callback(new Error('Not allowed by CORS'))
            console.log('-----------------------------------------------------------------------------')
            console.log('origin: ', origin)
            callback(null, true) // everyone is allowed
        }
    }

    app.use(cors(corsOptions))
    app.use(cookieParser())
}

// export const resCookie = (res: Response, user: IUser) => {
//     return res.cookie('token', user.token, {
//         ...cookieSettings,
//         expires: new Date(user.tokenDeathTime || 0),
//     })
// }

// export const resCookie = (res: Response, token: string, deviceToken: string) => {
//     const dToken = deviceToken.slice(0, 36)
//     const deathTime = deviceToken.slice(37)
//
//     return res.cookie('token', token, {
//         ...cookieSettings,
//         expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
//     }).cookie('deviceToken', dToken, {
//         ...cookieSettings,
//         expires: new Date(deathTime),
//     })
// }
