import { BcryptAdapter } from '@/infra/adapters/crypto/bcrypt-adapter/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash')
  },
  async compare(value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)

  return sut
}

describe('Bcrypt Adapter', () => {
  describe('Hash', () => {
    it('should call bcrypt.hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')

      await sut.hash('any_value')

      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return a hash on success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')

      expect(hash).toBe('hash')
    })

    it('should throw if bcrypt.hash throws', async () => {
      const sut = makeSut()

      ;(jest.spyOn(bcrypt, 'hash') as jest.Mock).mockRejectedValueOnce(new Error())

      const promise = sut.hash('any_value')

      await expect(promise).rejects.toThrow()
    })
  })

  describe('Compare', () => {
    it('should call bcrypt.compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')

      const data = {
        value: 'any_value',
        hash: 'any_hash'
      }

      await sut.compare(data)
      expect(compareSpy).toHaveBeenCalledWith(data.value, data.hash)
    })

    it('should return true if bcrypt.compare succeeds', async () => {
      const sut = makeSut()

      const data = {
        value: 'any_value',
        hash: 'any_hash'
      }

      const result = await sut.compare(data)
      expect(result).toBeTruthy()
    })

    it('should return false if bcrypt.compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false) as any)

      const data = {
        value: 'wrong_value',
        hash: 'any_hash'
      }

      const result = await sut.compare(data)
      expect(result).toBeFalsy()
    })

    it('should throw if bcrypt.compare throws', async () => {
      const sut = makeSut()

      ;(jest.spyOn(bcrypt, 'compare') as jest.Mock).mockRejectedValueOnce(new Error())

      const data = {
        value: 'wrong_value',
        hash: 'any_hash'
      }

      const promise = sut.compare(data)

      await expect(promise).rejects.toThrow()
    })
  })
})
