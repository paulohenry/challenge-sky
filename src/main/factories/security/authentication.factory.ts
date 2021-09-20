import { Authentication } from '@/domain/usecases/signin/protocols/authentication.usecase'
import { AuthenticationImplements } from '@/domain/usecases/signin/implements/authentication.implements'
import { BcryptAdapter } from '@/infra/adapters/crypto/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/adapters/crypto/jwt-adapter/jwt-adapter'
import { UserModel } from '@/infra/db/mongoose/models/user.model'
import { UserMongoRepository } from '@/infra/db/mongoose/users/users.repository'
import environment from '@/main/config/environment'
import { makeValidationFactory } from '@/main/factories/security/authentication-validation.factory'

export const makeAuthentication = (): Authentication => {
  const salt = 12
  const { jwtSecret, expireIn } = environment
  const userMongoRepository = new UserMongoRepository(UserModel)
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(jwtSecret, expireIn)
  return new AuthenticationImplements(makeValidationFactory(), userMongoRepository, bcryptAdapter, jwtAdapter)
}
