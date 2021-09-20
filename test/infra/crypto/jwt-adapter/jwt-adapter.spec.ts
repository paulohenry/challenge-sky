import { JwtAdapter } from '@/infra/adapters/crypto/jwt-adapter/jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token'
  }
}))

const makeSut = (): JwtAdapter<any> => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  it('should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt({ id: 'any_id' })
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret', undefined)
  })

  it('should return a token on sign success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt({ id: 'any_id' })
    expect(accessToken).toBe('any_token')
  })

  it('should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt({ id: 'any_id' })
    await expect(promise).rejects.toThrow()
  })
})
