import { Guid } from 'guid-typescript'

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<T> {
  protected readonly _id: string
  protected props: T

  constructor(props: T, id?: string) {
    this._id = id ?? Guid.create().toString()
    this.props = props
  }

  public get id(): string {
    return this._id
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!isEntity(object)) {
      return false
    }

    return this._id === object._id
  }
}
