import { Telefone } from '@/domain/entities/telefones.entity'
import { Entity } from '@/shared/entity'
import { Guid } from 'guid-typescript'

export interface UserProps {
  nome: string
  email: string
  senha: string
  telefones?: Telefone[]
  ultimo_login: Date
  data_criacao?: Date
  data_atualizacao?: Date
  access_token: string
}

export class User extends Entity<UserProps> {
  public get nome(): string {
    return this.props.nome
  }
  public set nome(nome: string) {
    this.props.nome = nome
  }
  public get senha(): string {
    return this.props.senha
  }
  public set senha(senha: string) {
    this.props.senha = senha
  }
  public get email(): string {
    return this.props.email
  }
  public set email(email: string) {
    this.props.email = email
  }
  public get ultimo_login(): Date {
    return this.props.ultimo_login
  }
  public set ultimo_login(ultimo_login: Date) {
    this.props.ultimo_login = ultimo_login
  }
  public get data_criacao(): Date {
    return this.props.ultimo_login
  }
  public get data_atualizacao(): Date {
    return this.props.ultimo_login
  }
  public get access_token(): string {
    return this.props.access_token ?? undefined
  }
  public set access_token(access_token: string) {
    this.props.access_token = access_token
  }
  public get telefones(): Telefone[] {
    return this.props.telefones ?? []
  }
  public addTelefones(telefones: Telefone[]): void {
    if (!this.props.telefones) {
      this.props.telefones = []
    }

    for (const telefone of telefones) {
      this.addTelefone(telefone)
    }
  }

  private addTelefone(telefone: Telefone): void {
    if (!this.props.telefones) {
      this.props.telefones = []
    }

    const sameTelefone = this.props.telefones.find((m) => m.equals(telefone))

    if (!sameTelefone) {
      this.props.telefones.push(telefone)
    }
  }

  public static create(props: UserProps, id?: string): User {
    const telefones = props.telefones ?? []
    return new User({ ...props, telefones }, id)
  }
}
