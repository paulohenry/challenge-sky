import { Entity } from '@/shared/entity'

export interface TelefoneProps {
  numero: string
  ddd: string
}

export class Telefone extends Entity<TelefoneProps> {
  public get numero(): string {
    return this.props.numero
  }
  public set numero(numero: string) {
    this.props.numero = numero
  }
  public get ddd(): string {
    return this.props.ddd
  }
  public set ddd(ddd: string) {
    this.props.ddd = ddd
  }

  public static create(props: TelefoneProps, id?: string): Telefone {
    return new Telefone({ ...props }, id)
  }
}
