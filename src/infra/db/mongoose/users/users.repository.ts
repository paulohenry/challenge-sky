import { UserDocument } from '@/infra/db/mongoose/schemas/schemas'
import { User } from '@/domain/entities/users.entity'
import { UserRepository } from '@/domain/repository/user.repository'
import { Guid } from 'guid-typescript'
import { Model } from 'mongoose'

export class UserMongoRepository implements UserRepository {
  constructor(private readonly userModel: Model<UserDocument>) {}

  async findOneById(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ _id: id })

    return user
      ? User.create(
          {
            access_token: user.access_token,
            nome: user.nome,
            senha: user.senha,
            email: user.email,
            ultimo_login: user.ultimo_login,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            telefones: user.telefones
          },
          user._id
        )
      : null
  }

  async updateOneUser(user: User): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: user.id.toString() },
      { ultimo_login: user.ultimo_login, access_token: user.access_token }
    )
  }
  async create(data: User): Promise<User | null> {
    const user = await this.userModel.create({
      _id: data.id,
      access_token: data.access_token,
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      ultimo_login: data.ultimo_login,
      telefones: data.telefones.map((tel) => {
        return {
          ddd: tel.ddd,
          numero: tel.numero,
          id: tel.id.toString()
        }
      })
    })
    return user
      ? User.create(
          {
            access_token: user.access_token,
            nome: user.nome,
            senha: user.senha,
            email: user.email,
            ultimo_login: user.ultimo_login,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            telefones: user.telefones
          },
          user._id
        )
      : null
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email: email })

    return user
      ? User.create(
          {
            access_token: user.access_token,
            nome: user.nome,
            senha: user.senha,
            email: user.email,
            ultimo_login: user.ultimo_login,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            telefones: user.telefones
          },
          user._id
        )
      : null
  }
}
