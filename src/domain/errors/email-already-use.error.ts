export class EmailAlreadyUseError extends Error {
  constructor() {
    super('Usuário já cadastrado')
    this.name = 'ConflictError'
  }
}
