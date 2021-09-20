import { Authentication } from '@/domain/usecases/signin/protocols/authentication.usecase'
import { AuthenticationTokenData } from '@/domain/usecases/signin/protocols/authentication-token-data.usecase'
import { Encrypter } from '@/domain/usecases/signin/protocols/encrypter.usecase'
import { HashComparer } from '@/domain/usecases/signin/protocols/hash-comparer.usecase'
import { AuthenticationData } from '@/domain/data-structures/requests/authentication.request'
import { UserRepository } from '@/domain/repository/user.repository'
import { Either, left, right } from '@/shared/either'
import { User } from '@/domain/entities/users.entity'
import { InvalidParamError, MissingParamError } from '@/domain/errors'
import { NotfoundError } from '@/domain/errors/not-found.error'
import { Validation } from '@/domain/validators'

export class AuthenticationImplements implements Authentication {
  constructor(
    private readonly validation: Validation,
    private readonly userRespository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter<AuthenticationTokenData>
  ) {}

  async auth(data: AuthenticationData): Promise<Either<Error, User>> {
    const error = this.validation.validate(data)

    if (error) return left(error)

    const user = await this.userRespository.findOneByEmail(data.email)

    if (!user) return left(new InvalidParamError('Usuário e/ou senha inválidos'))

    const result = await this.hashComparer.compare({
      value: data.senha,
      hash: user.senha
    })

    if (!result) return left(new InvalidParamError('Usuário e/ou senha inválidos'))

    const newTokenAtLogin = await this.encrypter.encrypt({ id: String(user.id) })
    user.access_token = newTokenAtLogin
    user.ultimo_login = new Date()
    await this.userRespository.updateOneUser(user)

    const findeduser = await this.userRespository.findOneByEmail(data.email)

    if (!findeduser) return left(new NotfoundError())

    return right(findeduser)
  }
}
