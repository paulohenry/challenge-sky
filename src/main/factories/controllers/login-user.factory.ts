import { makeAuthentication } from '@/main/factories/security/authentication.factory'
import { LoginController } from '@/presentation/controller/login-user.controller'

export const makeLoginController = (): LoginController => {
  const authentication = makeAuthentication()
  return new LoginController(authentication)
}
