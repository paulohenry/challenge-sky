export interface Decrypter<T> {
  decrypt: (value: string) => Promise<T | null>
}
