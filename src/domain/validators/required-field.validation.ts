import { MissingParamError } from '@/domain/errors'
import { Validation } from '@/domain/validators/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(data: any): Error | null {
    if (!data[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }

    return null
  }
}
