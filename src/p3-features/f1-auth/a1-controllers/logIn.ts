import {Request, Response} from 'express'
import {instance} from '../../../p2-main/friendBack'
import {resCookie} from '../../../p2-main/cookie'
import {BaseError} from '../../../p1-common/c1-errors/BaseError'

export const logIn = async (req: Request, res: Response) => {
    const {token} = req.body
    if (token) {
        const newToken = await checkTokenByFriendBack(token, res)

        if (newToken) sendAnswer(res, newToken)
    } else {
        new BaseError({
            type: 401,
            e: 'no token!',
            inTry: 'login',
            more: {token},
        }).send(res)
    }
}

// helpers
const checkTokenByFriendBack = async (token: string, res: Response): Promise<string> => {
    try {
        const p = await instance.post('api/friends/auth/login', {tempPassword: token})
        // console.log('ok: ', {...p.data})

        if (p.data.resultCode === 1) {
            new BaseError({
                type: 401,
                e: 'login password not valid!',
                inTry: 'login',
                more: {token, errors: p.data.messages},
            }).send(res)
            return ''
        } else {
            return p.data.data.token
        }
    } catch (e) {
        console.log('error: ', {...e})
        new BaseError({
            type: 500,
            e: e,
            inTry: 'login',
            more: {token},
        }).send(res)
        return ''
    }
}

const sendAnswer = (res: Response, token: string) => {
    resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
        .status(200).json({login: true})
}
