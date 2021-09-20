export class InvalidSession extends Error {
  constructor() {
    super('Sessão Inválida')
    this.name = 'InvalidSession'
  }
}
