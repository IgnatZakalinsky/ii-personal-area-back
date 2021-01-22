import express from 'express'
import {getPlaylists} from './p1-controllers/getPlaylists'
import {addPlaylistMock} from './p1-controllers/addPlaylist'

const playlists = express.Router()

playlists.post('/', addPlaylistMock)
playlists.get('/', getPlaylists)
// playlists.delete('/:id?', PlaylistController.deleteItem.bind(PlaylistController))
// playlists.put('/', putPlaylist)


export default playlists
