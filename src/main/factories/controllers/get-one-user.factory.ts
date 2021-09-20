import { GetOneUserImplements } from '@/domain/usecases/get-one-user/implements/get-one-user.implements'
import { UserModel } from '@/infra/db/mongoose/models/user.model'
import { UserMongoRepository } from '@/infra/db/mongoose/users/users.repository'
import { GetOneUserControler } from '@/presentation/controller/get-one-user.controller'

export const makeGetOneUserController = (): GetOneUserControler => {
  const userRepository = new UserMongoRepository(UserModel)
  const getOneUserImplemnt = new GetOneUserImplements(userRepository)
  return new GetOneUserControler(getOneUserImplemnt)
}
