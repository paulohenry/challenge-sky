import { GetOneUserUsecase } from '@/domain/usecases/get-one-user/protocol/get-one-user.usecase'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class GetOneUserControler implements Controller {
  constructor(private readonly getOneUser: GetOneUserUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId

      const user = await this.getOneUser.findOneById(userId)
      if (user.isLeft()) {
        return badRequest(user.value)
      }

      return ok(user.value)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
