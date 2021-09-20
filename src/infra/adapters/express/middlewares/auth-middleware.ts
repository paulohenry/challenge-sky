import { Decrypter } from '@/domain/usecases/signin/protocols/decrypter.usecase'
import { AuthenticationTokenData } from '@/domain/usecases/signin/protocols/authentication-token-data.usecase'
import { BearerTokenExtractor } from '@/presentation/protocols/bearer-token-extractor'
import { forbidden, invalidSession, ok, serverError } from '@/presentation/helpers/http/http.helper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Middleware } from '@/presentation/protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly decrypter: Decrypter<AuthenticationTokenData | null>,
    private readonly bearerTokenExtractor: BearerTokenExtractor
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const bearerToken = httpRequest.headers?.authorization

      if (!bearerToken) return forbidden()

      const extractedToken = this.bearerTokenExtractor.extract(bearerToken)

      if (!extractedToken) return forbidden()

      const decrypted = await this.decrypter.decrypt(extractedToken)

      if (!decrypted) return invalidSession()
      return ok({ userId: decrypted.id })
    } catch (err: any) {
      return serverError(err)
    }
  }
}
