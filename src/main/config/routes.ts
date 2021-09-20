import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = async (app: Express): Promise<void> => {
  const router = Router()

  app.use('/', router)

  await Promise.all(
    readdirSync(join(__dirname, '..', 'routes')).map(async (file) => {
      if (!file.includes('.map')) {
        ;(await import(join(__dirname, '..', 'routes', file))).default(router)
      }
    })
  )
}
