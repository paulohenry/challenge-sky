export class ServerError extends Error {
  constructor(stack?: string) {
    super('Erro interno do servidor 500')
    this.name = 'ServerError'
    this.stack = stack
  }
}
