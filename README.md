- [Commands](#commands)
- [Requirements](#requirements)
- [Installation](#installation)
- [API keys](#api-keys)
- [Running](#running)
- [Packages used](#packages-used)
  
#### Commands

`;global`, `;price [symbol]`, `;info [symbol]` & more coming...

#### Requirements

[Node.js with npm is required](https://nodejs.org/en/download/package-manager/).

#### Installation

Run `npm install` inside the source folder to install dependencies from package.json. <br>

#### API keys

Set your [Discord bot token](https://discordapp.com/developers/applications/) in [auth.json](auth.json). <br>

![token](https://i.imgur.com/QKQR5fm.png)

Set your [Coinmarketcap API key](https://coinmarketcap.com/api/) in `cmc-info`'s constructor call. <br>
Example (from [bot.js](bot.js)):
```
const cmc_api = require("cmc-info");
let cmc = new cmc_api("API_KEY");
```

#### Running

Run with `node bot.js`. <br>

#### Packages used
Discord API: [discord.js](https://github.com/discordjs/discord.js)<br>
Coinmarketcap API: [cmc-info](https://github.com/n3onis/cmc-info)
