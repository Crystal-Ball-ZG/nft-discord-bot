# Zeitgeist Seer Badge Bot
This is the repo for the zeitigeist seer program badge issuing discord bot.

### Definitions
- **Bot.** The discord bot nodejs process.
- **Minting server.** Zeitgeist minting api that is called by the bot to mint. 
## Hard Requirements
The bot needs to listen for the `/claim $address` command on a particular channel on the seer discord server, and take a substrate address as a parameter. Then get the users `roles` on the seer discord server and send them to the minting server for processing. The server will then mint NFTs for any **new roles** the user might have acquired. If they already own the NFT for that particular role, or the server is in the process of minting said NFT it will respond with an error message. In any case the bot is only tasked with relaying the message back to the user.

_The bot is not required to do any checks for exiting NFTs. All double mint prevention and locking logic is handled by the minting server._

#### ✅ Typescript.
The bot needs to be written in typescript with source files in the `src` folder and the built files in the `dist` folder.

#### ✅ Throttling.
Throttle the calls to the minting server, if the user spams the /claim command, only one request every five second should pass through to the actual minting server.

#### ✅ Self contained.
This repo should only contain a package with the bot service without any hosting details like Docker, Kubernetes etc. The `main` field in the package json should refer to the built file that starts the bot, and the `scripts.start` field should be the command to start it, referring to the same file.

## Optionals:
- Address validation in the bot with error message if user supplies address with wrong format/encoding.

### Minting server api

**Authorization:**
Every call made to the minting server web hooks will have to be authenticated with a token. The writer of this bot only needs to supply it from the env as implementation of the bot will be handled internally by zeitgeist.  The token can be referred to with `process.env.MINTING_SERVER_TOKEN`

### claim

**URL:** https://avatar-bsr.zeitgeist.pm/webhooks/seer/discord

**Method:** POST

**Request:**
```
Content-Type: application/json
Authorization: bearer MINTING_SERVER_TOKEN

{
  "command": "claim",
  "payload":
    {
      “address”: string,
      "discordUserId": string,
      “roles”:  [{ "name": string, "id": string }]
    }
}
```

 **Response:**
 ```
Content-Type: application/json
Status: 
	  200 - one or more nfts where minted
	| 204 - request was successfull, but nothing new to claim/mint
	| 400 - the request body was not formatted correctly.
	| 401 - unautorized/invalid token
	| 500 - server error

{
  “message”: string
}
```
