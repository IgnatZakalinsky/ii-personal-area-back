import mongoose, {Schema, Document, Model, CreateQuery, FilterQuery} from 'mongoose'

export type PLAYLIST_TAGS = 'todolist'

export type COURSES = 'React'

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
export const uniqueProperties: Extract<keyof CreateQuery<IPlaylist>, keyof FilterQuery<IPlaylist>>[] = ['name']

export interface IPlaylist extends Document {
    _id: mongoose.Types.ObjectId

    name: string
    levelAccess: number
    tags: string[]
    // courseType: string
    // position: number
    // access start/end date

    created: Date
    updated: Date

    // _doc: object // crutch
}

export type PlaylistType = {
    name: string
    levelAccess: number
    tags: string[]
}
// export type UpdatePlaylistType = Partial<PlaylistType>
// export type UpdatePlaylistType = {
//     name?: string
//     levelAccess?: number
//     tags?: string[]
// }

// new Schema for object

const PlaylistSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        levelAccess: {
            type: Number,
            required: true,
        },

        tags: [{
            type: String,
            // type: [String],
        }],

    },

    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
)

const Playlist: Model<IPlaylist> = mongoose.model<IPlaylist>('ii-playlist', PlaylistSchema)

export default Playlist
