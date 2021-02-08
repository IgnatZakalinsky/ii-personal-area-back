import {Request, Response} from 'express'
import {resCookie} from '../../../p2-main/cookie'
import {UserController} from './index'
import {BaseError} from '../../../p1-common/c1-errors/BaseError'
import {IUser, UserType} from "../a0-models/UserModel";
import {instance} from '../../../p2-main/friendBack'

type FriendAnswerType = {
    id?: number // 3,
    level?: number // 0,
    telegramId?: number // 7471213,
    lastUpdateDate?: string // '2020-12-30T10:09:01.0488913Z',
    inactive?: boolean // false,
    courseId?: number // 1,
    courseTitle?: string // 'Front-end developer',
    firstName?: string // 'Игнат',
    lastName?: string // 'Закалинский',
}

export const me2 = async (req: Request, res: Response) => {
    const {token} = req.cookies

    if (token) {
        const userFromFriendBack = await checkTokenByFriendBack(token, res)

        resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                    .status(200).json({user: userFromFriendBack})




        // if (userFromFriendBack.id) {
        //     const users = await findUserInBase(userFromFriendBack.id, res)
        //
        //
        //     // create or update user if need
        // }

        // sendAnswer

        //     if (!users.length) {
        //         const answer = await UserController._BLL.addItem({
        //             ...restData,
        //             baseId: id,
        //             baseToken: token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7),
        //             tokens: [],
        //             isAdmin: false,
        //         })
        //
        //         console.log('answer: ', answer)
        //         if (answer instanceof BaseError) {
        //             answer.send(res)
        //
        //         } else {
        //             delete answer.baseToken
        //             delete answer.tokens
        //
        //             resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
        //                 .status(200).json({user: answer})
        //         }
        //     } else {
        //         const user = {...restData, baseId: id}
        //         resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
        //             .status(200).json({user})
        //     }

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
const checkTokenByFriendBack = async (token: string, res: Response): Promise<FriendAnswerType> => {
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
            return {}
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
        return {}
    }
}

// const findUserInBase = async (id: number, res: Response): Promise<UserType[]> => {
//
//     const users = await UserController._BLL.getItems({baseId: id}, {})
//
//     if (users instanceof BaseError) {
//         users.send(res)
//         return []
//
//     } else {
//         return users
//     }
// }

// const createOrUpdateIfNeed = async (
//     users: UserType[],
//     userFromFriendBack: FriendAnswerType,
//     token: string,
//     res: Response
// ): Promise<UserType | {}> => {
//     if (!users.length) {
//
//         const newUser: BaseCreateQueryType<IUser> = {
//             baseId: userFromFriendBack.id || 0,
//             level: userFromFriendBack.level || 0,
//             telegramId: userFromFriendBack.telegramId || 0,
//             lastUpdateDate: userFromFriendBack.lastUpdateDate || '2020-12-30T10:09:01.0488913Z',
//             inactive: userFromFriendBack.inactive || false,
//             courseId: userFromFriendBack.courseId || 1,
//             courseTitle: userFromFriendBack.courseTitle || 'Front-end developer',
//             firstName: userFromFriendBack.firstName || 'ErrorUser',
//             lastName: userFromFriendBack.lastName || 'Error',
//             isAdmin: false,
//             baseToken: token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7),
//             tokens: [],
//             created: new Date(),
//             updated: new Date()
//         }
//
//         const answer = await UserController._BLL.addItem(newUser)
//
//         console.log('answer: ', answer)
//         if (answer instanceof BaseError) {
//             answer.send(res)
//             return {}
//         } else {
//             delete answer.baseToken
//             delete answer.tokens
//
//             return answer
//         }
//     } else {
//         const checkedProps: Exclude<keyof UserType, '_id' | 'baseId' | 'isAdmin'>[] = [
//             'level',
//             'telegramId',
//             'lastUpdateDate',
//             'inactive',
//             'courseId',
//             'courseTitle',
//             'firstName',
//             'lastName',
//         ]
//         let propI = 0
//         while (propI < checkedProps.length
//         && users[0][checkedProps[propI]] === userFromFriendBack[checkedProps[propI]]) propI++
//
//         if (propI < checkedProps.length) {// if user props changed
//
//             // update
//             return users[0]
//         }
//         return users[0]
//     }
// }
