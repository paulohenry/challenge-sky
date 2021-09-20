import { bodyParser, contentType, cors } from '@/infra/adapters/express/middlewares'
import { Express } from 'express'
import morgan from 'morgan'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(morgan('common'))
}
