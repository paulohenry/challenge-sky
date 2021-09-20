import { User } from '@/domain/entities/users.entity'
import { NotfoundError } from '@/domain/errors/not-found.error'
import { UserRepository } from '@/domain/repository/user.repository'
import { GetOneUserUsecase } from '@/domain/usecases/get-one-user/protocol/get-one-user.usecase'
import { Either, left, right } from '@/shared/either'

export class GetOneUserImplements implements GetOneUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}
  async findOneById(id: string): Promise<Either<Error, User>> {
    const user = await this.userRepository.findOneById(id)
    if (!user) return left(new NotfoundError())
    return right(user)
  }
}
