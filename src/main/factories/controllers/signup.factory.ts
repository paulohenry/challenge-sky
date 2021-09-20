import { SignUpImplements } from '@/domain/usecases/signup/implements/signup.implements'
import { BcryptAdapter } from '@/infra/adapters/crypto/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/adapters/crypto/jwt-adapter/jwt-adapter'
import { UserModel } from '@/infra/db/mongoose/models/user.model'
import { UserMongoRepository } from '@/infra/db/mongoose/users/users.repository'
import environment from '@/main/config/environment'
import { makeValidationFactory } from '@/main/factories/security/authentication-validation.factory'
import { SignupController } from '@/presentation/controller/signup.controller'

export const makeSignupController = (): SignupController => {
  const salt = 12
  const { expireIn, jwtSecret } = environment
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(jwtSecret, expireIn)
  const userRepository = new UserMongoRepository(UserModel)
  const createOneUserImplements = new SignUpImplements(
    makeValidationFactory(),
    jwtAdapter,
    bcryptAdapter,
    userRepository
  )
  return new SignupController(createOneUserImplements)
}
