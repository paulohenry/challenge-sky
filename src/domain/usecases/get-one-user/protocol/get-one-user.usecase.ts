import { User } from '@/domain/entities/users.entity'
import { Either } from '@/shared/either'

export interface GetOneUserUsecase {
  findOneById(id: string | undefined): Promise<Either<Error, User>>
}
