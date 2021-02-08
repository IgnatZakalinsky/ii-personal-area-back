import express from 'express'
import {getPlaylists} from './p1-controllers/getPlaylists'
import {addPlaylist} from './p1-controllers/addPlaylist'
import {PlaylistController} from './p1-controllers'
import {putPlaylist} from './p1-controllers/putPlaylist'
import {adminAuth} from '../f1-auth/a4-helpers/adminAuth'

const playlists = express.Router()

playlists.post('/', adminAuth(addPlaylist, 'addPlaylist'))
playlists.get('/', adminAuth(getPlaylists, 'getPlaylists'))
playlists.delete(
    '/:id?',
    adminAuth(PlaylistController.deleteItem.bind(PlaylistController), 'deletePlaylist')
)
playlists.put('/', adminAuth(putPlaylist, 'putPlaylist'))

export default playlists
