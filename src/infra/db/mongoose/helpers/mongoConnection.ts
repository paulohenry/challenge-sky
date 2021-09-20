import mongoose from 'mongoose'

export const MongoConnectionHelper = (mongoUrl: string) => {
  return mongoose.connect(mongoUrl)
}
