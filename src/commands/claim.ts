import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import { ICommand } from '../interfaces/ICommand'
import { isValidAddress } from '../utils/isValidAddress'
import { throttleCommand } from '../utils/throttleCommand'
import api from '../services/mint'

export const claim: ICommand = {
  data: new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Claim your unminted Seer NFTs')
    .addStringOption(option =>
      option
        .setName('address')
        .setDescription('Wallet address of user')
        .setRequired(true),
    ),
  run: throttleCommand(async (interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return

    const { commandName } = interaction

    if (commandName === 'claim') {
      const address = interaction.options.getString('address') || ''

      const addressIsValid = isValidAddress(address)

      if (!addressIsValid) {
        return await interaction.reply({
          content: 'Invalid wallet address',
          ephemeral: true,
        })
      }

      const response = await api.mint({
        command: 'claim',
        payload: {
          address,
          discordUserId: interaction.user.id,
          roles: (interaction?.member?.roles as any).member.roles.cache.map(
            (r: any) => ({ name: r.name, id: r.id }),
          ),
        },
      })

      await interaction.reply(response.message)
    }
  }, 5000),
}
