import {Request, Response} from 'express'
import {PlaylistController} from './index'


export const getPlaylists = async (req: Request, res: Response) => {
    // check body in baseController
    const find = {}
    const sort = {}
    const itemForPageCount = 1000
    const pageNumber = 1

    await PlaylistController.getItems(req, res, find, sort, itemForPageCount, pageNumber)
}
