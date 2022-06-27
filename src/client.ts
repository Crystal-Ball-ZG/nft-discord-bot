import { Client, Intents } from 'discord.js'

import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";

export const initialize = () => {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

  client.on("ready", async () => await onReady());

  client.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction) 
  );

  client.login(process.env.CLIENT_TOKEN)
} 
