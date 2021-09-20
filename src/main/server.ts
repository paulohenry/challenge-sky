import 'module-alias/register'
import { makeExpressApp } from '@/main/config/app'
import environment from '@/main/config/environment'
import { MongoConnectionHelper } from '@/infra/db/mongoose/helpers/mongoConnection'

import dotenv from 'dotenv'

dotenv.config()

const { port, mongoDbUrl } = environment

MongoConnectionHelper(mongoDbUrl)
  .then((mongo) => console.log('connected'))
  .catch((err) => console.log(err))

makeExpressApp()
  .then(async (app) => {
    app.listen(port, () => console.log(`Server running at port: ${port}`))
  })
  .catch((err) => {
    console.error(err)
  })
