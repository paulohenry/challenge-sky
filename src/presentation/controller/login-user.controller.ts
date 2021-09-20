import { Authentication } from '@/domain/usecases/signin/protocols/authentication.usecase'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, senha } = httpRequest.body

      const user = await this.authentication.auth({
        email,
        senha
      })

      if (user.isLeft()) {
        return badRequest(user.value)
      }

      return ok(user.value)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
