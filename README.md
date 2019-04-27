#### This is just the bot's framework. Commands are yet to be added due to API change.

(Node.js is required)[https://nodejs.org/en/download/package-manager/].

Run `npm install` inside the source folder to install dependencies. <br>

Set your Discord bot token in [auth.json](auth.json). <br>

Set your Coinmarketcap API key in `cmc-info`'s constructor call. <br>
Example (from [bot.js](bot.js)):
```
const cmc_api = require("cmc-info");
let cmc = new cmc_api("API_KEY");
```

Run with `node bot.js`. <br><br>

Links:
> Discord API: [discord.js](https://github.com/discordjs/discord.js)<br>
> Coinmarketcap API: [cmc-info](https://github.com/n3onis/cmc-info)
