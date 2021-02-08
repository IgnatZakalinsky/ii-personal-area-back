import {Response} from 'express'

export type BaseErrorType = {
    type: 400 | 401 | 500 // код ошибки, можно расширять
    e: any // текст ошибки (400, +) или ошибка (500)
    inTry: string // где произошла ошибка
    more?: any // данные, которые могут помочь понять в чём ошибка
}

export class BaseError {
    constructor(error: BaseErrorType) {
        this.type = error.type
        this.e = error.e
        this.inTry = error.inTry
        this.more = error.more
    }

    type: 400 | 401 | 500
    e: any
    inTry: string
    more?: any

    // отправка ответа
    send(res: Response) {
        res.status(this.type).json({
            more: this.more,
            inTry: this.inTry,
            errorObj: this.type === 500 ? {...this.e} : undefined, // превращение ошибки в объект
            error: this.type === 500
                ? 'some error: ' + this.e.message
                : this.e,
            info: this.type === 500 // стандартное описание ошибки
                ? "Back doesn't know what the error is... ^._.^"
                : 'Check your request! /ᐠ-ꞈ-ᐟ\\',
        })
    }

    // промис с отловом ошибок
    static PromiseWithTry = (inTryName: string) => <A>(
        getAnswer: () => A,
        methodName: string,
        more?: any
    ) => {
        return new Promise<A | BaseError>(async (res, rej) => {
            try {
                const answer = await getAnswer()

                res(answer)
            } catch (e) {
                if (e instanceof BaseError) {
                    rej(e)

                } else {
                    rej(new BaseError({
                        type: 500,
                        e,
                        inTry: `${inTryName}${methodName}`,
                        more,
                    }))
                }
            }
        })
    }

    // промис с отловом ошибок и автоматической отправкой ошибки на фронт
    static PromiseWithTryAndSend = (inTryName: string) => <A>(
        response: Response,
        getAnswer: () => A,
        methodName: string,
        more?: any
    ) => {
        return new Promise<A | void>(async (res) => {
            try {
                const answer = await BaseError.PromiseWithTry(inTryName)(getAnswer, methodName, more)

                if (answer instanceof BaseError) {
                    answer.send(response) // maybe never
                } else {
                    res(answer)
                }
            } catch (e) {
                e.send(response) // PromiseWithTry => e: BaseError
            }
        })
    }
}
