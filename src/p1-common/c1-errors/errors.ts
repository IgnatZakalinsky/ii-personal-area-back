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
