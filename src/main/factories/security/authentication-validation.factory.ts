import { RequiredFieldValidation, Validation, ValidationComposite } from '@/domain/validators'

export const makeValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []

  const requiredFields = ['email', 'senha']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
