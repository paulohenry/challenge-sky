import { makeExpressApp } from '@/main/config/app'
import { Express } from 'express'
import request from 'supertest'

describe('Body Parser Middleware', () => {
  let app: Express

  beforeAll(async () => {
    app = await makeExpressApp()
  })

  it('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app).post('/test_body_parser').send({ name: 'any_name' }).expect({ name: 'any_name' })
  })
})
