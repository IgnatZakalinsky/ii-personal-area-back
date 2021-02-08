import {Request, Response} from 'express'
import {PlaylistController} from './index'

export const putPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body

    // check playlist in baseController

    await PlaylistController.putItem(req, res, playlist)
}
