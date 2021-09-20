import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller): ((req: Request, res: Response) => void) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      userId: req.userId
    }

    const response = await controller.handle(httpRequest)

    if (response.body instanceof Error) {
      console.error(response.body)
      res.status(response.statusCode).json({
        error: response.body.name,
        message: response.body.message
      })
    } else {
      res.status(response.statusCode).json(response.body)
    }
  }
}
