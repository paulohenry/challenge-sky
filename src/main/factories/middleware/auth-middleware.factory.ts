import { AuthenticationTokenData } from '@/domain/usecases/signin/protocols/authentication-token-data.usecase'
import { JwtAdapter } from '@/infra/adapters/crypto/jwt-adapter/jwt-adapter'
import environment from '@/main/config/environment'
import { BearerTokenExtractorImpl } from '@/infra/adapters/bearer/bearer-token-extractor.implements'
import { AuthMiddleware } from '@/infra/adapters/express/middlewares/auth-middleware'

export const makeAuthMiddleware = (): AuthMiddleware => {
  const jwtAdapter = new JwtAdapter<AuthenticationTokenData>(environment.jwtSecret, environment.expireIn)
  return new AuthMiddleware(jwtAdapter, new BearerTokenExtractorImpl())
}
