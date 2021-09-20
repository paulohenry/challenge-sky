import { ICreteUserData } from '@/domain/data-structures/requests/create-user.request'
import { User } from '@/domain/entities/users.entity'
import { Either } from '@/shared/either'

export interface SignUpUseCase {
  create: (data: ICreteUserData) => Promise<Either<Error, User>>
}
