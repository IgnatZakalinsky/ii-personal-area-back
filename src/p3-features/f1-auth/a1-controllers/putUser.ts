import {Request, Response} from 'express'
import {resCookie} from '../../../p2-main/cookie'
import {UserModel} from '../a3-dal'
import {BaseError} from '../../../p1-common/c1-errors/BaseError'

export const putUser = async (req: Request, res: Response) => {
    const {id, avatar} = req.body
    const {token} = req.cookies

    await BaseError.PromiseWithTryAndSend('updateUser')(
        res,
        async () => {
            await UserModel.updateItemById(id, {avatar})
        },
        '.putUser',
        {id, avatar}
        )

    resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
        .status(200).json({putUser: true})
}
