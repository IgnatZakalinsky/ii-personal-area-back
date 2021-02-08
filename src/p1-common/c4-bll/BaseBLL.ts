import {
    BaseCreateQueryType,
    BaseDAL,
    BaseDocDefType,
    BaseDocType,
    BaseFilterQueryType,
    BaseSortQueryType, BaseUpdateQueryType
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

    async getItems(
        find: BaseFilterQueryType<T>,
        sort: BaseSortQueryType<T>,
        itemForPageCount?: number,
        pageNumber?: number
    ) {
        return this.BLLPromise<{ [key: string]: any }>(
            async () => {
                const items = await this._DAL.readArray(find, sort, itemForPageCount, pageNumber)
                const count = await this._DAL.countItems(find)
                const modelName = this._DAL.modelName

                return {[modelName + 's']: items, [modelName + 'sTotalCount']: count}
            },
            '.getItems',
            {find, sort}
        )
    }

    async deleteItem(id: string) {
        return this.BLLPromise<T>(
            async () => {
                const item = await this._DAL.getItemById(id)

                if (!item) {
                    return new BaseError({
                        e: `BLL:${this._DAL.modelName} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
                        type: 400,
                        inTry: `BLL:${this._DAL.modelName}.deleteItem/1`,
                        more: {id}
                    })
                } else {
                    const deletedItem = await this._DAL.removeItemById(id)

                    if (deletedItem) return deletedItem
                    else return new BaseError({
                        e: `BLL:${this._DAL.modelName} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
                        type: 400,
                        inTry: '.deleteItem/2',
                        more: {id}
                    })
                }
            },
            `BLL:${this._DAL.modelName}.deleteItem`,
            {id},
        )
    }

    async putItem(id: string, checkedItem: BaseUpdateQueryType<T>) {
        return this.BLLPromise<T>(
            async () => {
                const item = await this._DAL.getItemById(id)

                if (!item) {
                    return new BaseError({
                        e: `BLL:${this._DAL.modelName} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
                        type: 400,
                        inTry: `BLL:${this._DAL.modelName}.putItem/1`,
                        more: {id}
                    })
                } else {
                    const updatedItem = await this._DAL.updateItemById(id, checkedItem)

                    if (updatedItem) return updatedItem
                    else return new BaseError({
                        e: `BLL:${this._DAL.modelName} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
                        type: 400,
                        inTry: '.putItem/2',
                        more: {id}
                    })
                }
            },
            '.putItem',
            {id, checkedItem},
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
