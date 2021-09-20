export class NotfoundError extends Error {
  constructor() {
    super('Não encontrado')
    this.name = 'NotfoundError'
  }
}
