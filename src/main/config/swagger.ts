import { serve, setup } from 'swagger-ui-express'
import * as json from '../docs/index.json'
import { Express } from 'express'
import { noCache } from '@/infra/adapters/express/middlewares/no-cache'

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(json))
}
