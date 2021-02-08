import {BaseDAL} from '../../../p1-common/c5-dal/BaseDAL'
import User, {IUser, uniqueUserProperties} from '../a0-models/UserModel'

export const UserModel = new BaseDAL<IUser>(User, 'User', uniqueUserProperties)
