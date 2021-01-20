import {
    BaseCreateQueryType,
    BaseDocDefType,
    BaseDocType,
    BaseFilterQueryType,
    BaseSortQueryType
} from '../c5-dal/BaseDAL'
import {BaseBLL} from '../c4-bll/BaseBLL'
import {Request, Response} from 'express'
import {BaseError} from '../c1-errors/BaseError'

export class BaseController<T extends BaseDocType> {
    constructor(BLL: BaseBLL<T>) {
        this._BLL = BLL
    }

    _BLL: BaseBLL<T>

    async addItem(req: Request, res: Response, checkedItem: BaseCreateQueryType<T>) {
        const addedItem = await this.ControllerPromise<T>(
            res,
            () => {
                return this._BLL.addItem(checkedItem)
            },
            '.addItem',
            {checkedItem},
        )

        res.status(201).json({['new' + this._BLL._DAL.modelName]: addedItem})
    }

    async getItems(req: Request, res: Response, find: BaseFilterQueryType<T>, sort: BaseSortQueryType<T>) {
        const items = await this
            .ControllerPromise<T[] extends Array<any> ? BaseDocDefType<T>[] : (BaseDocDefType<T> | null)>(
            res,
            () => {
                return this._BLL.getItems(find, sort)
            },
            '.getItems',
            {find, sort},
        )

        res.status(200).json({[this._BLL._DAL.modelName + 's']: items})
    }

    ControllerPromise<A>(
        res: Response,
        getAnswer: () => Promise<A | BaseError>,
        methodName: string,
        more?: any
    ) {
        return BaseError.PromiseWithTryAndSend(`Controller:${this._BLL._DAL.modelName}`)
        (res, getAnswer, methodName, more)
    }
}
