import { NextFunction, Request, Response } from 'express'

export const fieldParser = (field: string) => (req: Request, res: Response, next: NextFunction) => {
  if (req.body?.[field]) {
    try {
      req.body[field] = JSON.parse(req.body[field])
    } catch (err) {
      res.status(400).json({ error: `expected ${field} field to be in json format` })
    }
  }
  next()
}
