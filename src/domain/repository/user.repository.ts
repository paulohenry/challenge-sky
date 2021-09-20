import { User } from '@/domain/entities/users.entity'
import { Guid } from 'guid-typescript'

export interface UserRepository {
  create: (data: User) => Promise<User | null>
  findOneByEmail: (email: string) => Promise<User | null>
  findOneById: (id: string) => Promise<User | null>
  updateOneUser: (user: User) => Promise<void>
}
