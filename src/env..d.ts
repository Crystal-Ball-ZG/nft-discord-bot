declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      MINTING_SERVER_TOKEN: string
      API_URl: string
      CLIENT_TOKEN: string
      CLIENT_ID: string
      GUILD_ID: string
    }
  }
}

export {}
