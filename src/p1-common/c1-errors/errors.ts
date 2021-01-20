// import {IS_DEVELOPER_VERSION} from '../../p0-config/config'
// import {Response} from 'express'
//
// export type ErrorType = {
//     e: any,
//     inTry: string,
//     more?: any,
// }
//
// export const status500 = (res: Response, e: any, inTry: string, more?: any) => {
//     const error = {
//         more,
//         error: 'some error: ' + e.message,
//         errorObject: IS_DEVELOPER_VERSION && {...e},
//         in: inTry, // where was error
//         info: "Back doesn't know what the error is... ^._.^",
//     };
//     console.error('!!! Error 500: ', error, {...e}) // need log always
//     res.status(500).json(error)
// };
// export const status400 = (res: Response, e: string, inTry: string, more?: any) => {
//     const error = {
//         more,
//         error: e,
//         in: inTry, // where was error
//         info: 'Check your request! /ᐠ-ꞈ-ᐟ\\',
//     };
//     console.error('!!! Error 400: ', error) // need log always
//     res.status(400).json(error)
// };

export const destruct = (e: any) => {
    return typeof e === 'object' ? {...e} : 'not object'
}

export const onUncaughtException = (f?: Function) => {
    process.on('uncaughtException', (e) => {
        f && f() // log in db

        console.log(`!!! Uncaught Exception${f ? ' with log in db' : ''}: `, destruct(e), e)
    })
}

export const onUnhandledRejection = (f?: Function) => {
    process.on('unhandledRejection', (reason, p) => {
        f && f() // log in db

        console.log(
            `!!! Unhandled Rejection${f ? ' with log in db' : ''}: `,
            reason,
            p.then(x => console.log('!!! then: ', x))
                .catch(e => console.log('!!! catch: ', destruct(e), e))
        )
    })
}

// отлов ошибок чтоб сервер не падал
export const globalCatch = (fUncaught?: Function, fUnhandled?: Function) => {
    onUncaughtException(fUncaught)
    onUnhandledRejection(fUnhandled)
}
