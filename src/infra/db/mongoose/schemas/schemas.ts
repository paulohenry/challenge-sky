import { Schema, Document } from 'mongoose'
import { User } from '@/domain/entities/users.entity'

export const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    data_criacao: { type: Date, required: false, default: new Date() },
    ultimo_login: { type: Date, required: false },
    data_atualizacao: { type: Date, required: false },
    access_token: { type: String, required: true },
    telefones: [
      {
        ddd: { type: String, required: true },
        numero: { type: String, required: true }
      }
    ]
  },
  { _id: false, collection: 'users', timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' } }
)

export type UserDocument = Omit<User, '_id'> & Document
