export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export interface File {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  path: string
  filename: string
}

export interface HttpRequest {
  body?: any
  file?: File
  headers?: any
  query?: any
  userId?: string
  params?: any
}
