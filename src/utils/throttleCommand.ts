import { CommandInteraction } from "discord.js";
import { Command } from "../interfaces/ICommand";

export const throttleCommand = (command: Command, expiresIn: number)  => {
  const index = new Map()

  return async (interaction: CommandInteraction) => {
    const { id: userId } = interaction.user
    if (index.has(userId)) {
      return await interaction.reply({ content: 'To many requests', ephemeral: true })
    }

    index.set(userId, true)

    setTimeout(() => {
      index.delete(userId)
    }, expiresIn)


    return await command(interaction)
  }
}
