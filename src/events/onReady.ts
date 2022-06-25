import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/commandList";
import { ICommand } from "../interfaces/ICommand";
import { logHandler } from "../utils/logHandler";

export const onReady = async (): Promise<void> => {
  try {
    const rest = new REST({ version: "9" }).setToken(
      process.env.CLIENT_TOKEN as string
    );

    const commandData: {
      name: string;
      description?: string;
      type?: number;
      options?: APIApplicationCommandOption[];
    }[] = [];

    CommandList.forEach((command: ICommand) =>
      commandData.push(
        command.data.toJSON() as {
          name: string;
          description?: string;
          type?: number;
          options?: APIApplicationCommandOption[];
        }
      )
    );
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID || "missing token",
        process.env.GUILD_ID as string
      ),
      { body: commandData }
    );
    logHandler.log("info", "Bot has connected to Discord!");
  } catch (err) {
    logHandler.log('error', "onReady event", err);
  }
};
