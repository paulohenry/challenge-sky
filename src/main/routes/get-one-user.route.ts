import { adaptMiddleware } from '@/infra/adapters/express/express-middleware-adapter'
import { adaptRoute } from '@/infra/adapters/express/express-route-adapter'
import { makeGetOneUserController } from '@/main/factories/controllers/get-one-user.factory'
import { makeAuthMiddleware } from '@/main/factories/middleware/auth-middleware.factory'
import { Router } from 'express'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.get('/get-one-user', auth, adaptRoute(makeGetOneUserController()))
}
