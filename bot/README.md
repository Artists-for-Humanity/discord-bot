# Discord-bot/bot

## Set up

1. Make sure [npm is installed](https://www.npmjs.com/get-npm).
1. Download the code using the green Code button [on the main page of the project](https://github.com/Artists-for-Humanity/discord-bot) or clone the repository in your Github Desktop app.
1. Copy the file `.env.example` and save it as `.env` in the `/bot` folder.
1. Get your Discord bot token ([How to:](https://www.writebots.com/discord-bot-token/#:~:text=A%20Discord%20Bot%20Token%20is,generate%20a%20Discord%20Bot%20Token.)) and replace `PUT_YOUR_TOKEN_HERE` with your token in the `.env` file. Leave the quotes around the value.
1. [Enable developer](https://discordia.me/en/developer-mode) mode in Discord and then [copy the channel ID](https://discordia.me/en/developer-mode#usage) and replace `PUT_YOUR_CHANNEL_ID_HERE` in the `.env` file. Leeave the quotes around the value.
1. Open the `/bot` folder in your Terminal (Mac) or Powershell (Windows).
1. Run `npm install` in Terminal.

## Starting the app

In order to run the bot on your computer go through the set up steps. Then:

1. In the `/bot` folder in Terminal and run `npm run start`.

## Reference

### Discord.js

We use a plugin called Discord.js in order to write Javascript code that can talk to Discord.

[Read more about the plugin here](https://discord.js.org/)

### Tutorial

We used this tutorial as a starting point for our Discord bot's code. Feel free to go through it to understand the basics of a Discord bot.

[youtube playlist](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4)
