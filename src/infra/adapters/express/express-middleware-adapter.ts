import { HttpRequest } from '@/presentation/protocols/http'
import { Middleware } from '@/presentation/protocols/middleware'
import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (
  middleware: Middleware
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      userId: req.userId
    }

    const response = await middleware.handle(httpRequest)

    if (response.body instanceof Error) {
      console.error(response.body)
      res.status(response.statusCode).json({
        error: response.body.name,
        message: response.body.message
      })
    } else {
      Object.assign(req, response.body)
      next()
    }
  }
}
