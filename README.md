Run `npm install` inside the source folder to install dependencies. <br>

Set your Discord bot token in [auth.json](auth.json). <br>

Set your Coinmarketcap API key in `cmc-info`'s constructor call. <br>
Example (from [bot.js](bot.js)):
```
const cmc_api = require("cmc-info");
let cmc = new cmc_api("API_KEY");
```

Run with `node bot.js`.
