import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/domain/validators/validation'
import { EmailValidator } from '@/presentation/protocols/email-validator'

export class EmailValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly emailValidator: EmailValidator) {}

  validate(data: any): Error | null {
    if (!this.emailValidator.isValid(data[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }
}
