# Discord-bot/bot

## Set up

**Make sure you followed the setup instructions in [the main folder](../).**

**Make sure you followed the setup instructions in [the data folder](../data).**

1. Copy the file `.env.example` and save it as `.env` in the `/bot` folder.
1. [Get your Discord bot token](https://www.writebots.com/discord-bot-token/#:~:text=A%20Discord%20Bot%20Token%20is,generate%20a%20Discord%20Bot%20Token) and replace `PUT_YOUR_TOKEN_HERE` with your token in the `.env` file. Leave the quotes around the value.
1. [Enable developer](https://discordia.me/en/developer-mode) mode in Discord and then [copy the channel ID](https://discordia.me/en/developer-mode#usage) and replace `PUT_YOUR_CHANNEL_ID_HERE` in the `.env` file. Leeave the quotes around the value.
1. Open the `/bot` folder in your Terminal (Mac) or Powershell (Windows).
1. Run `npm install` in Terminal.

## Starting the app

1. Open the `/bot` folder in your Terminal (Mac) or Powershell (Windows).
1. Run `npm run start`.

## Reference

### Discord.js

We use a plugin called Discord.js in order to write Javascript code that can talk to Discord.

[Read more about the plugin here](https://discord.js.org/)

### Tutorial

We used this tutorial as a starting point for our Discord bot's code. Feel free to go through it to understand the basics of a Discord bot.

[Youtube: How to Make a Discord Bot with discord.js](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4)
