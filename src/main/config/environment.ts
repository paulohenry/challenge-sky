import dotenv from 'dotenv'

dotenv.config()
const getEnvironmentOrThrow = (key: string): string => {
  const env = process.env[key]
  if (!env) throw new Error(`Environment ${key} is required`)
  return env
}
export default {
  port: Number(getEnvironmentOrThrow('PORT')),
  jwtSecret: getEnvironmentOrThrow('JWT_SECRET'),
  mongoDbUrl: getEnvironmentOrThrow('MONGO_DB_URL'),
  nodeEnv: getEnvironmentOrThrow('NODE_ENV'),
  expireIn: Number(getEnvironmentOrThrow('EXPIRE_TOKEN_IN'))
}
