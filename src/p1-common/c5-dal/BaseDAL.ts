import {CreateQuery, UpdateQuery, Document, DocumentDefinition, FilterQuery, Model} from 'mongoose'
import {BaseError} from '../c1-errors/BaseError'

// типы конкретной базы данных
export type BaseDocType = Document
export type BaseModelType<T extends BaseDocType> = Model<T>
export type BaseCreateQueryType<T> = CreateQuery<T>
export type BaseUpdateQueryType<T> = UpdateQuery<T>
export type BaseFilterQueryType<T> = FilterQuery<T>
export type BaseDocDefType<T> = DocumentDefinition<T>
// sort from mongoose ¯\_(ツ)_/¯
/**
 * Sets the sort order
 * If an object is passed, values allowed are asc, desc, ascending, descending, 1, and -1.
 * If a string is passed, it must be a space delimited list of path names. The
 * sort order of each path is ascending unless the path name is prefixed with -
 * which will be treated as descending.
 */
export type BaseSortQueryType<T> = string | any

export class BaseDAL<T extends BaseDocType> {
    constructor(
        Model: BaseModelType<T>,
        modelName: string,
        uniqueProperties?: Extract<keyof BaseCreateQueryType<T>, keyof BaseFilterQueryType<T>>[]
    ) {
        this._Model = Model
        this.modelName = modelName
        this.uniqueProperties = uniqueProperties

    }

    _Model: BaseModelType<T>
    modelName: string
    uniqueProperties?: Extract<keyof BaseCreateQueryType<T>, keyof BaseFilterQueryType<T>>[]

    createItem(checkedItem: BaseCreateQueryType<T>) {
        return this.DALPromise<T>(
            async () => {
                await this.checkUnique(checkedItem, '.createItem')

                return this._Model.create(checkedItem)
            },
            '.createItem',
            {checkedItem},
        )
    }

    readArray(
        find: BaseFilterQueryType<T>,
        sort: BaseSortQueryType<T>,
        itemForPageCount = 1000,
        pageNumber = 1
    ) {
        return this.DALPromise<T[] extends Array<any> ? BaseDocDefType<T>[] : (BaseDocDefType<T> | null)>(
            () => {
                return this._Model.find(find)
                    .sort(sort)
                    .skip(itemForPageCount * (pageNumber - 1))
                    .limit(itemForPageCount)
                    .lean()
                    .exec()
            },
            '.readArray',
            {find, sort, itemForPageCount, pageNumber},
        )
    }

    getItemById(id: string) {
        return this.DALPromise<T | null>(
            () => {
                return this._Model.findById(id)
                    .exec()
            },
            '.getItemById',
            {id},
        )
    }

    countItems(find: BaseFilterQueryType<T>) {
        return this.DALPromise<number>(
            () => {
                return this._Model.count(find)
                    .exec()
            },
            '.countItems',
            {find},
        )
    }

    removeItemById(id: string) {
        return this.DALPromise<T | null>(
            () => {
                return this._Model.findByIdAndDelete(id)
                    .exec()
            },
            '.removeItemById',
            {id},
        )
    }

    updateItemById(id: string, item: BaseUpdateQueryType<T>) {
        return this.DALPromise<T | null>(
            () => {
                return this._Model.findByIdAndUpdate(id, item, {new: true})
                    .exec()
            },
            '.updateItemById',
            {id, item},
        )
    }

    checkUnique(checkedItem: BaseCreateQueryType<T>, methodName: string) {
        return this.DALPromise<void>(
            async () => {
                if (this.uniqueProperties) {
                    let find: BaseFilterQueryType<T> = {}

                    for (const p of this.uniqueProperties) {
                        if (checkedItem[p]) {
                            find[p] = checkedItem[p]

                            const count = await this.countItems(find)

                            if (count) {
                                const findKey = Object.keys(find)[0]

                                throw new BaseError({
                                    type: 400,
                                    inTry: `DAL:${this.modelName}${methodName}.checkUnique`,
                                    e: `Duplicate ${this.modelName} item property {${findKey}: ${find[findKey]}} ^._.^`,
                                    more: {checkedItem, uniqueProperties: this.uniqueProperties, find, count},
                                })
                            } else {
                                find = {}
                            }
                        }
                    }
                }
            },
            methodName + '.checkUnique',
            {checkedItem},
        )
    }

    // more

    DALPromise<A>(
        getAnswer: () => Promise<A>,
        methodName: string,
        more?: any
    ) {
        return BaseError.PromiseWithTry(`DAL:${this.modelName}`) // отлов и стандартизация ошибок
        (getAnswer, methodName, more)
    }
}
