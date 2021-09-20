import { SignUpUseCase } from '@/domain/usecases/signup/protocols/signup.usecase'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class SignupController implements Controller {
  constructor(private readonly signup: SignUpUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, senha, nome, telefones } = httpRequest.body

      const response = await this.signup.create({ email, nome, senha, telefones })
      if (response.isLeft()) {
        return badRequest(response.value)
      }
      return ok(response.value)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
