export class ForbiddenError extends Error {
  constructor() {
    super('Operação proibida')
    this.name = 'ForbiddenError'
  }
}
