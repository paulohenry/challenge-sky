export interface Encrypter<T> {
  encrypt: (data: T) => Promise<string>
}
