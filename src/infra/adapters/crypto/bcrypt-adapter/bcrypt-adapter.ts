import { HashCompareData, HashComparer } from '@/domain/usecases/signin/protocols/hash-comparer.usecase'
import { Hasher } from '@/domain/usecases/signin/protocols/hasher.usecase'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async compare(data: HashCompareData): Promise<boolean> {
    return bcrypt.compare(data.value, data.hash)
  }

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
