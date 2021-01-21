import {Request, Response} from 'express'
import {BaseDocDefType} from '../../../p1-common/c5-dal/BaseDAL'
import {BaseController} from '../../../p1-common/c3-controllers/BaseController'
import {PlaylistLogic} from '../p2-bll'
import {IPlaylist} from "../p0-models/PlaylistModel";
import {BaseError} from "../../../p1-common/c1-errors/BaseError";

export const PlaylistController = new BaseController(PlaylistLogic)

export const getPlaylistsMock = async (req: Request, res: Response) => {
    res.status(200).json({
        playlists: [
            {
                _id: '1',
                name: 'Курс "React JS - путь самурая 1.0", уроки, практика',
                levelAccess: 0,
                tags: ['react', 'redux',],
                created: new Date().toString(),
                updated: new Date().toString(),
            },
            {
                _id: '2',
                name: '#lesson_01',
                levelAccess: 100,
                tags: ['start', 'component', 'props',],
                created: new Date().toString(),
                updated: new Date().toString(),
            },
        ],
        playlistsTotalCount: 2
    })
}
export const getPlaylists = async (req: Request, res: Response) => {
    const find = {}
    const sort = {}

    const items = await PlaylistController
        .ControllerPromise<IPlaylist[] extends Array<any> ? BaseDocDefType<IPlaylist>[] : (BaseDocDefType<IPlaylist> | null)>(
            res,
            () => {
                return PlaylistController._BLL.getItems(find, sort)
            },
            '.getItems',
            {find, sort},
        )

    if (items && !(items instanceof BaseError)) {
        const modelName = PlaylistController._BLL._DAL.modelName
        res.status(200).json({[modelName + 's']: items, [modelName + 'sTotalCount']: items.length})
    }
}
