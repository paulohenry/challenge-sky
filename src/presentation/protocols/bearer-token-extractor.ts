export interface BearerTokenExtractor {
  extract: (bearerToken: string) => string | undefined
}
