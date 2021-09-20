import { BearerTokenExtractor } from '@/presentation/protocols/bearer-token-extractor'

export class BearerTokenExtractorImpl implements BearerTokenExtractor {
  extract(bearerToken: string): string | undefined {
    return bearerToken.split('Bearer ')?.[1]
  }
}
