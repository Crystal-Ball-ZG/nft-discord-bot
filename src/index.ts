import dotenv from 'dotenv'
import { initialize } from './client'
import { validateEnv } from './utils/validateEnv'

dotenv.config()
validateEnv()

initialize()
