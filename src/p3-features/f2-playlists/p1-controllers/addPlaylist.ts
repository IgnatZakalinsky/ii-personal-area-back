import {Request, Response} from 'express'
import {PlaylistController} from './index'

export const addPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body

    // check playlist in baseController

    await PlaylistController.addItem(req, res, playlist)
}
