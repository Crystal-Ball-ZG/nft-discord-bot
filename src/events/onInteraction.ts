import { Interaction } from "discord.js";
import { CommandList } from "../commands/commandList";
import { logHandler } from "../utils/logHandler";

export const onInteraction = async (
  interaction: Interaction
): Promise<void> => {
  try {
    if (interaction.isCommand()) {
      for (const Command of CommandList) {
        if (interaction.commandName === Command.data.name) {
          await Command.run(interaction)
          break;
        }
      }
    }
  } catch (err) {
    logHandler.log("error", "onInteraction event", err)
  }
};
