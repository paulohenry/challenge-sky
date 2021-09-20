import { ICreteUserData } from '@/domain/data-structures/requests/create-user.request'
import { Telefone } from '@/domain/entities/telefones.entity'
import { User } from '@/domain/entities/users.entity'
import { MissingParamError, ServerError } from '@/domain/errors'
import { EmailAlreadyUseError } from '@/domain/errors/email-already-use.error'
import { UserRepository } from '@/domain/repository/user.repository'
import { AuthenticationTokenData } from '@/domain/usecases/signin/protocols/authentication-token-data.usecase'
import { Encrypter } from '@/domain/usecases/signin/protocols/encrypter.usecase'
import { Hasher } from '@/domain/usecases/signin/protocols/hasher.usecase'
import { SignUpUseCase } from '@/domain/usecases/signup/protocols/signup.usecase'
import { Validation } from '@/domain/validators'
import { Either, left, right } from '@/shared/either'

export class SignUpImplements implements SignUpUseCase {
  constructor(
    private readonly validation: Validation,
    private readonly encrypter: Encrypter<AuthenticationTokenData>,
    private readonly hasher: Hasher,
    private readonly userRepository: UserRepository
  ) {}
  async create(data: ICreteUserData): Promise<Either<Error, User>> {
    const error = this.validation.validate(data)

    if (error) return left(error)
    const user = await this.userRepository.findOneByEmail(data.email)

    if (user?.email === data.email) {
      return left(new EmailAlreadyUseError())
    }

    const hashedPassword = await this.hasher.hash(data.senha)

    const almostNewUser = User.create({
      email: data.email,
      nome: data.nome,
      senha: hashedPassword,
      ultimo_login: new Date(),
      access_token: ''
    })
    const telefones = data.telefones.map((tel) => Telefone.create({ ...tel }))
    almostNewUser.addTelefones(telefones)

    const token = await this.encrypter.encrypt({ id: String(almostNewUser.id) })
    almostNewUser.access_token = token

    const newUser = await this.userRepository.create(almostNewUser)
    if (!newUser) {
      return left(new ServerError())
    }
    return right(newUser)
  }
}
