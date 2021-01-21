import express from 'express'
import {getPlaylistsMock, getPlaylists} from './p1-controllers/getPlaylists'

const playlists = express.Router()

// playlists2.post('/', addPlaylist)
playlists.get('/', getPlaylists)
// playlists.delete('/:id?', PlaylistController.deleteItem.bind(PlaylistController))
// playlists.put('/', putPlaylist)


export default playlists
