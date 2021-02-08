import express from 'express'
import {logIn} from './a1-controllers/logIn'
import {me2} from './a1-controllers/me2'
import {logOut} from './a1-controllers/logOut'
import {putUser} from './a1-controllers/putUser'

const auth = express.Router()

auth.post('/login', logIn)
auth.get('/me', me2)
auth.put('/me', putUser)
auth.get('/logout', logOut)

export default auth
