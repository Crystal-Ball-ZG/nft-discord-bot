import { logHandler } from './logHandler'

export const validateEnv = (): void => {
  if (!process.env.CLIENT_TOKEN) {
    logHandler.log('warn', 'Missing CLIENT_TOKEN env.')
    process.exit(1)
  }

  if (!process.env.API_URL) {
    logHandler.log('warn', 'Missing API_URL env.')
    process.exit(1)
  }

  if (!process.env.CLIENT_ID) {
    logHandler.log('warn', 'Missing CLIENT_ID env.')
    process.exit(1)
  }

  if (!process.env.GUILD_ID) {
    logHandler.log('warn', 'Missing GUILD_ID env.')
    process.exit(1)
  }
}
