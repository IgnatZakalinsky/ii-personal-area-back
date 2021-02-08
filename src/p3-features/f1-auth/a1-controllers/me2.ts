import {Request, Response} from 'express'
import {resCookie} from '../../../p2-main/cookie'
import {BaseError} from '../../../p1-common/c1-errors/BaseError'
import {instance} from '../../../p2-main/friendBack'
import {UserModel} from '../a3-dal'

type FriendAnswerType = {
    id: number // 3,
    level: number // 0,
    telegramId: number // 7xxxxx3,
    lastUpdateDate: string // '2020-12-30T10:09:01.0488913Z',
    inactive: boolean // false,
    courseId: number // 1,
    courseTitle: string // 'Front-end developer',
    firstName: string // 'Игнат',
    lastName: string // 'Закалинский',
}

export const me2 = async (req: Request, res: Response) => {
    const {token} = req.cookies

    if (token) {
        const userFromFriendBack = await checkTokenByFriendBack(token, res)

        let user: any

        try {
            const users = await UserModel.readArray(
                {baseId: userFromFriendBack ? userFromFriendBack.id : 0},
                {}
            )

            if (users instanceof BaseError) {
                throw new Error('new')
            } else if (users.length) {
                // update
                user = await UserModel.updateItemById(
                    users[0]._id.toString(),
                    {
                        ...userFromFriendBack,
                        baseId: userFromFriendBack ? userFromFriendBack.id : 0,
                    }
                )

            } else {
                throw new Error('new')
            }
        } catch (e) {
            // create
            user = await UserModel.createItem({
                baseId: userFromFriendBack?.id || 0,
                level: userFromFriendBack?.level || 0,
                telegramId: userFromFriendBack?.telegramId || 0,
                lastUpdateDate: userFromFriendBack?.lastUpdateDate || '2020-12-30T10:09:01.0488913Z',
                inactive: userFromFriendBack?.inactive || false,
                courseId: userFromFriendBack?.courseId || 1,
                courseTitle: userFromFriendBack?.courseTitle || 'Front-end developer',
                firstName: userFromFriendBack?.firstName || 'ErrorUser',
                lastName: userFromFriendBack?.lastName || 'Error',
                isAdmin: false,
                baseToken: token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7),
                tokens: [],
                created: new Date(),
                updated: new Date(),
                avatar: '',
            })

            delete user.baseToken
            delete user.tokens
        }

        resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
            .status(200).json({user})

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
const checkTokenByFriendBack = async (token: string, res: Response): Promise<FriendAnswerType | undefined> => {
    try {
        const p = await instance.get('api/friends/auth/students/by-token/' + token)
        // console.log('ok: ', {...p})

        if (p.data.resultCode === 1) {
            new BaseError({
                type: 401,
                e: 'token not valid!',
                inTry: 'me',
                more: {token, errors: p.data.messages},
            }).send(res)
        } else {
            return p.data
        }
    } catch (e) {
        new BaseError({
            type: 500,
            e: e,
            inTry: 'me',
            more: {token},
        }).send(res)
        console.log('error: ', e)
    }
}
