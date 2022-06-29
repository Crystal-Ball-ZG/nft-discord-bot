import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export type Command = (interaction: CommandInteraction) => Promise<void>

export interface ICommand {
  data:
    | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>
    | SlashCommandSubcommandsOnlyBuilder
  run: Command
}
