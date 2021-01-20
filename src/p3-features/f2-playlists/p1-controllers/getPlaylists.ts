import {Request, Response} from 'express'

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
