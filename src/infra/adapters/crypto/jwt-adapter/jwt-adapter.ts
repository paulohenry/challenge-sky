import { Decrypter } from '@/domain/usecases/signin/protocols/decrypter.usecase'
import { Encrypter } from '@/domain/usecases/signin/protocols/encrypter.usecase'
import jwt from 'jsonwebtoken'

// eslint-disable-next-line @typescript-eslint/ban-types
export class JwtAdapter<T extends string | object | Buffer> implements Encrypter<T>, Decrypter<T> {
  constructor(private readonly secret: string, private readonly expiresIn?: string | number | undefined) {}

  async decrypt(value: string): Promise<T | null> {
    try {
      return jwt.verify(value, this.secret) as T
    } catch (err) {
      return null
    }
  }

  async encrypt(data: T): Promise<string> {
    const accessToken = jwt.sign(data, this.secret, this.expiresIn ? { expiresIn: this.expiresIn } : undefined)
    return accessToken
  }
}
