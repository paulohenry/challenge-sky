import { makeExpressApp } from '@/main/config/app'
import { Express } from 'express'
import request from 'supertest'

describe('Cors Middleware', () => {
  let app: Express

  beforeAll(async () => {
    app = await makeExpressApp()
  })

  it('should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
