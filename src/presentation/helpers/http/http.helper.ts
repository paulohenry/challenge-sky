import { ServerError, UnauthorizedError } from '@/domain/errors'
import { ForbiddenError } from '@/domain/errors/forbidden.error'
import { InvalidSession } from '@/domain/errors/invalid-session.error'
import { HttpResponse } from '@/presentation/protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (): HttpResponse => ({
  statusCode: 403,
  body: new ForbiddenError()
})

export const serverError = (err: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(err.stack)
})

export const invalidSession = (): HttpResponse => ({
  statusCode: 403,
  body: new InvalidSession()
})

export const ok = <T>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data
})
