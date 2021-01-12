import axios from 'axios'

const baseURL = process.env.FRIEND_BACK_URL || ''
const FRIEND_KEY = process.env.FRIEND_KEY || ''

export const instance = axios.create({
    baseURL,
    headers: {'FRIEND-KEY': FRIEND_KEY},
})
