import { NextFunction, Request, Response } from 'express'

export const noCache = (req: Request, res: Response, next: NextFunction): void => {
  res.set('Cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  res.set('Surrogate-Control', '0')
  next()
}
