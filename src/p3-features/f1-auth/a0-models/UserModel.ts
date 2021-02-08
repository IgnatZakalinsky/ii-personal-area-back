import mongoose, {Schema, Document, Model, CreateQuery, FilterQuery} from 'mongoose'

// export type PLAYLIST_TAGS = 'todolist'
//
// export type COURSES = 'React'

// type X = {
//     a: 1
//     b: 2
//     c: 3
//     d: 4
// }
// type Y = {
//     b: 2
//     c: 3
//     d: 4
//     e: 5
//     f: 6
// }

// type Intersection<X, Y> = {
//     [k in  keyof X & keyof Y]: Y[k]
// }
// type Z<X, Y> = {
//     [k in Extract<keyof X, keyof Y>]: X[k]
// }

// const x: Z<X, Y> = {b: 2, c: 3, d: 4 }
export const uniqueUserProperties: Extract<keyof CreateQuery<IUser>, keyof FilterQuery<IUser>>[] =
    ["baseId", "baseToken"]

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId

    baseId: number // 3,
    level: number // 0,
    telegramId: number // 746128012,
    lastUpdateDate: string // '2020-12-30T10:09:01.0488913Z',
    inactive: boolean // false,
    courseId: number // 1,
    courseTitle: string // 'Front-end developer',
    firstName: string // 'Игнат',
    lastName: string // 'Закалинский',

    baseToken: string
    tokens: string[]
    isAdmin: boolean

    created: Date
    updated: Date

    // _doc: object // crutch
}

export type UserType = {
    baseId: number // 3,
    level: number // 0,
    telegramId: number // 746128012,
    lastUpdateDate: string // '2020-12-30T10:09:01.0488913Z',
    inactive: boolean // false,
    courseId: number // 1,
    courseTitle: string // 'Front-end developer',
    firstName: string // 'Игнат',
    lastName: string // 'Закалинский',

    // baseToken: string
    // tokens: string[]
    isAdmin: boolean
}
// export type UpdatePlaylistType = Partial<PlaylistType>
// export type UpdatePlaylistType = {
//     name?: string
//     levelAccess?: number
//     tags?: string[]
// }

// new Schema for object

const UserSchema: Schema = new Schema(
    {
        baseId: {
            type: Number,
            required: true,
            unique: true,
        },
        level: {
            type: Number,
            required: true,
        },
        telegramId: {
            type: Number,
            required: true,
            unique: true,
        },
        lastUpdateDate: {
            type: String,
            required: true,
        },
        inactive: {
            type: Boolean,
            required: true,
        },
        courseId: {
            type: Number,
            required: true,
        },
        courseTitle: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        baseToken: {
            type: String,
            required: true,
        },
        tokens: [{
            type: String,
        }],
        isAdmin: {
            type: Boolean,
            required: true,
        },

    },

    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
)

const User: Model<IUser> = mongoose.model<IUser>('ii-user', UserSchema)

export default User
