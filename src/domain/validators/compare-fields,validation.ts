import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/domain/validators/validation'

export class CompareFieldsValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly fieldNameToCompare: string) {}

  validate(data: any): Error | null {
    if (data[this.fieldName] !== data[this.fieldNameToCompare]) {
      return new InvalidParamError(this.fieldNameToCompare)
    }

    return null
  }
}
