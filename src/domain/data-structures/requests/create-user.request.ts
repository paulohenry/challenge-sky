export interface ITelefones {
  numero: string
  ddd: string
}

export interface ICreteUserData {
  nome: string
  email: string
  senha: string
  telefones: ITelefones[]
}
