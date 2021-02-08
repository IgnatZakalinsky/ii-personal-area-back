import {IUser} from '../a0-models/UserModel'
import {UserModel} from '../a3-dal'
import {BaseBLL} from '../../../p1-common/c4-bll/BaseBLL'

export const UserLogic = new BaseBLL<IUser>(UserModel)
