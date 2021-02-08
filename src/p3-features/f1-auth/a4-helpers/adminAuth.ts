import {Request, Response} from 'express'
import {instance} from '../../../p2-main/friendBack'
import {BaseError} from '../../../p1-common/c1-errors/BaseError'

const save = {token: ''} // logout time?

export const adminAuth = (controller: (req: Request, res: Response) => void, methodName: string) =>
    async (req: Request, res: Response) => {
        const token = req.body.token || req.query.token

        await BaseError.PromiseWithTryAndSend(methodName + '[adminAuth]')(
            res,
            async () => {
                // check token
                if (token) {
                    try {
                        // check saved token
                        if (token !== save.token) {
                            const response = await instance.get(`/api/auth/me/${token}`)
                            console.log('-----------------------------------------------------------------------------')
                            console.log('admin me:', response.data)
                            console.log('-----------------------------------------------------------------------------')

                            save.token = token
                            // throw error if not admin
                        }
                        controller(req, res)

                        // errors
                    } catch (e) {
                        if (e instanceof BaseError) {
                            e.send(res) // maybe never
                        } else {
                            console.log('e: ', {...e})

                            throw new BaseError({
                                e: e,
                                type: 500,
                                inTry: methodName + '.request to friend back (/api/auth/me/:token)',
                                more: {token, responseData: e.response && e.response.data},
                            })
                        }
                    }
                } else {
                    return new BaseError({
                        e: 'no admin token!',
                        type: 400,
                        inTry: methodName + '.checkToken',
                        more: {token},
                    })
                }
            },
            methodName,
            {token},
        )
    }
