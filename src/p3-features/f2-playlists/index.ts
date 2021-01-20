import express from 'express'
import {getPlaylistsMock} from './p1-controllers/getPlaylists'

const playlists = express.Router()

// playlists2.post('/', addPlaylist)
playlists.get('/', getPlaylistsMock)
// playlists.delete('/:id?', PlaylistController.deleteItem.bind(PlaylistController))
// playlists.put('/', putPlaylist)


export default playlists
