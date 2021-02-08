import {BaseCreateQueryType, BaseDocType, BaseFilterQueryType, BaseSortQueryType, BaseUpdateQueryType} from '../c5-dal/BaseDAL'
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

        res.status(201).json({['new_' + this._BLL._DAL.modelName]: addedItem})
    }

    async getItems(
        req: Request,
        res: Response,
        find: BaseFilterQueryType<T>,
        sort: BaseSortQueryType<T>,
        itemForPageCount?: number,
        pageNumber?: number
    ) {
        const answer = await this.ControllerPromise<{ [key: string]: any }>(
            res,
            () => {
                return this._BLL.getItems(find, sort, itemForPageCount, pageNumber)
            },
            '.getItems',
            {find, sort},
        )

        res.status(200).json(answer)
    }

    async deleteItem(req: Request, res: Response) {
        const {id} = req.params

        const deletedItem = await this.ControllerPromise<T>(
            res,
            () => {
                return this._BLL.deleteItem(id)
            },
            '.deleteItem',
            {id},
        )

        res.status(200).json({['deleted_' + this._BLL._DAL.modelName]: deletedItem})
    }

    async putItem(req: Request, res: Response, checkedItem: BaseUpdateQueryType<T>) {
        const {id} = req.body

        const addedItem = await this.ControllerPromise<T>(
            res,
            () => {
                return this._BLL.putItem(id, checkedItem)
            },
            '.putItem',
            {id, checkedItem},
        )

        res.status(201).json({['new_' + this._BLL._DAL.modelName]: addedItem})
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
