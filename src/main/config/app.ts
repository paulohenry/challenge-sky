import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'
import { setupSwagger } from '@/main/config/swagger'
import express, { Express } from 'express'

export const makeExpressApp = async (): Promise<Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  await setupRoutes(app)

  return app
}
