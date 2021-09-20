import { AuthenticationData } from '@/domain/data-structures/requests/authentication.request'
import { User } from '@/domain/entities/users.entity'
import { Either } from '@/shared/either'

export interface Authentication {
  auth: (data: AuthenticationData) => Promise<Either<Error, User>>
}
