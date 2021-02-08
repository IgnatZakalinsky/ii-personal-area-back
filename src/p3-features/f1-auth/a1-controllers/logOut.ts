import {Request, Response} from 'express'
import {resCookie} from '../../../p2-main/cookie'

export const logOut = async (req: Request, res: Response) => {
    resCookie(res, '', '').status(200).json({logout: true})
};
