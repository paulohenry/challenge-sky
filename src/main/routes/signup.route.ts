import { adaptRoute } from '@/infra/adapters/express/express-route-adapter'
import { makeSignupController } from '@/main/factories/controllers/signup.factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
