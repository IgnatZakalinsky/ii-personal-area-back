import {BaseBLL} from '../../../p1-common/c4-bll/BaseBLL'
import {PlaylistModel} from '../p3-dal'
import {IPlaylist} from '../p0-models/PlaylistModel'

export const PlaylistLogic = new BaseBLL<IPlaylist>(PlaylistModel)
