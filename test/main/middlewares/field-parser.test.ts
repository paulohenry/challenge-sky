import { makeExpressApp } from '@/main/config/app'
import { fieldParser } from '@/infra/adapters/express/middlewares/field-parser'
import { Express } from 'express'
import request from 'supertest'

describe('Attribute Parser Middleware', () => {
  let app: Express

  beforeAll(async () => {
    app = await makeExpressApp()
  })

  it('should parse any field as json', async () => {
    app.post('/test_field_parser', fieldParser('field'), (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_field_parser')
      .send({ field: '{ "name": "test" }' })
      .expect('content-type', /json/)
      .expect({ field: { name: 'test' } })
  })
})
