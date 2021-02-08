import express from 'express'
import {getPlaylists} from './p1-controllers/getPlaylists'
import {addPlaylist} from './p1-controllers/addPlaylist'
import {PlaylistController} from './p1-controllers'
import {putPlaylist} from './p1-controllers/putPlaylist'

const playlists = express.Router()

playlists.post('/', addPlaylist)
playlists.get('/', getPlaylists)
playlists.delete('/:id?', PlaylistController.deleteItem.bind(PlaylistController))
playlists.put('/', putPlaylist)

export default playlists
