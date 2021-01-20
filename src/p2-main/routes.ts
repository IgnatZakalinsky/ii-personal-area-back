import {Express, Request, Response} from 'express'
import {VERSION} from '../p0-config/config'
import playlists from '../p3-features/f2-playlists'

export const routes = (app: Express) => {
    // app.use(VERSION + '/auth', auth)
    app.use(VERSION + '/playlists', playlists)

    // ping endpoint
    app.use(VERSION + '/ping', (req: Request, res: Response) => {
        // save statistic
        const backTime = new Date().getTime()
        const frontTime = +req.body.frontTime || (req.query.frontTime && +req.query.frontTime) || (backTime + 1)
        const ping = backTime - frontTime
        console.log('!!! PING: ', ping)

        res.status(200).json({
            ping,
            backTime,
            frontTime: frontTime > backTime ? '—ฅ/ᐠ.̫ .ᐟ\\ฅ—' : frontTime,
            info: 'please send me you time —ฅ/ᐠ.̫ .ᐟ\\ฅ—', // https://cutekaomoji.com/animals/cats/
        })
    })

    // about server
    app.use(VERSION, (req: Request, res: Response) => {
        res.status(200).json({hello: 'world'})
    })

    // default
    app.use((req: Request, res: Response) => {
        console.log('bad url: ', req.method, req.url)
        res.status(404).json({
            error: 'bad url /ᐠ｡ꞈ｡ᐟ\\',
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body,
        })
    })
}
