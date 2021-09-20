import { UserDocument, UserSchema } from '../schemas/schemas'
import mongoose from 'mongoose'

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)
