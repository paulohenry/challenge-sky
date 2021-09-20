import { adaptRoute } from '@/infra/adapters/express/express-route-adapter'
import { makeLoginController } from '@/main/factories/controllers/login-user.factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signin', adaptRoute(makeLoginController()))
}
