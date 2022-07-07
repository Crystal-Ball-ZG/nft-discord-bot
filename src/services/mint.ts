import axios from 'axios'
import { join } from 'path'

import { IDiscordRole } from '../interfaces/IDiscordRole'

type MintResponse = {
  message: string
}

type MintRequest = {
  command: 'claim'
  payload: {
    address: string
    discordUserId: string
    roles: Array<IDiscordRole>
  }
}

const STATUS = {
  200: 'One or more nfts where minted.',
  204: 'Request was successfull, but nothing new to claim/mint.',
  400: 'The request body was not formatted correctly.',
  401: 'Unautorized/invalid token.',
  500: 'Server Error.',
}

const getMessage = (status: number, message: string) => {
  return message || STATUS[status as keyof typeof STATUS] || STATUS[500]
}

export default {
  mint: async (payload: MintRequest) => {
    try {
      const response = await axios.post<MintResponse>(
        new URL('/webhooks/seer/discord', process.env.API_URL).href,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: process.env.MINTING_SERVER_TOKEN as string,
          },
        },
      )

      return {
        message: getMessage(response.status, response.data.message),
      }
    } catch (err: any) {
      return {
        message: getMessage(err.response?.status, err.response?.data.message),
      }
    }
  },
}
