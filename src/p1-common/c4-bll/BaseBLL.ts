import {
    BaseCreateQueryType,
    BaseDAL,
    BaseDocDefType,
    BaseDocType,
    BaseFilterQueryType,
    BaseSortQueryType
} from '../c5-dal/BaseDAL'
import {BaseError} from '../c1-errors/BaseError'

export class BaseBLL<T extends BaseDocType> {
    constructor(DAL: BaseDAL<T>) {
        this._DAL = DAL
    }

    _DAL: BaseDAL<T>

    async addItem(checkedItem: BaseCreateQueryType<T>) {
        return this.BLLPromise<T>(
            async () => {

                return this._DAL.createItem(checkedItem)
            },
            '.addItem',
            {checkedItem},
        )
    }

    async getItems(find: BaseFilterQueryType<T>, sort: BaseSortQueryType<T>) {
        return this.BLLPromise<{ [key: string]: any }>(
            async () => {
                const items = await this._DAL.readArray(find, sort)
                const count = await this._DAL.countItems(find)
                const modelName = this._DAL.modelName

                return {[modelName + 's']: items, [modelName + 'sTotalCount']: count}
            },
            '.getItems',
            {find, sort}
        )
    }


    BLLPromise<A>(
        getAnswer: () => Promise<A | BaseError>,
        methodName: string,
        more?: any
    ) {
        return BaseError.PromiseWithTry(`BLL:${this._DAL.modelName}`)
        (getAnswer, methodName, more)
    }
}

//         addItem<T>(checkedItem: T) {
//             return this._Model.createItem(checkedItem)
//         },
//         deleteItem(id: string) {
//             type AnswerType = { type: 200, deletedItem: any | null }
//                 | { type: 400 | 500, error: ErrorType }
//
//             return new Promise<AnswerType>(async res => {
//
//                 try {
//                     const item = await this._Model.getItemById(id)
//
//                     if (!item) res({
//                         type: 400,
//                         error: {e: name + ' id not valid /ᐠ｡ꞈ｡ᐟ\\', inTry: `delete${name}/get${name}ById`, more: {id}},
//                     })
//                     else {
//                         try {
//                             const deletedItem = await this._Model.removeItemById(id)
//                             res({type: 200, deletedItem})
//
//                         } catch (e) {
//                             res({
//                                 type: 500,
//                                 error: {e, inTry: `delete${name}/remove${name}ById`, more: {id}},
//                             })
//                         }
//                     }
//                 } catch (e) {
//                     res({
//                         type: 400,
//                         error: {
//                             e: `may be ${name} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
//                             inTry: `delete${name}/get${name}ById`,
//                             more: {id, error: 'some error: ' + e.message, errorObject: {...e}},
//                         }
//                     })
//                 }
//             })
//         },
//         putItem<T>(id: string, item: T) {
//             type AnswerType = { type: 200, updatedItem: any | null }
//                 | { type: 400 | 500, error: ErrorType }
//
//             return new Promise<AnswerType>(async res => {
//
//                 try {
//                     const oldItem = await this._Model.getItemById(id)
//
//                     if (!oldItem) res({
//                         type: 400,
//                         error: {
//                             e: name + ' id not valid /ᐠ｡ꞈ｡ᐟ\\',
//                             inTry: `put${name}/get${name}ById`,
//                             more: {id, item, oldItem},
//                         }
//                     })
//                     else {
//                         try {
//                             const newItem = this._checkUpdate(item, oldItem)
//                             log(`new${name}: `, newItem)
//
//                             const updatedItem = await this._Model.updateItemById(id, newItem)
//                             res({type: 200, updatedItem})
//
//                         } catch (e) {
//                             res({
//                                 type: 500,
//                                 error: {e, inTry: `put${name}/update${name}ById`, more: {id, item, oldItem}},
//                             })
//                         }
//                     }
//                 } catch (e) {
//                     res({
//                         type: 400,
//                         error: {
//                             e: `may be ${name} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
//                             inTry: `put${name}/get${name}ById`,
//                             more: {id, error: 'some error: ' + e.message, errorObject: {...e}, item},
//                         }
//                     })
//                 }
//             })
//         },
//
//     }
// }
