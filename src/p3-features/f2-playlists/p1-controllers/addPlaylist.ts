import {Request, Response} from 'express'
import {PlaylistController} from './index'

export const addPlaylistMock = async (req: Request, res: Response) => {
    res.status(200).json({})
}
export const addPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body

    // check playlist

    await PlaylistController.addItem(req, res, playlist)
}
