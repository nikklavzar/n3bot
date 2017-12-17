# n3bot v1.0.0 (in development)
Last update: 17/12/2017, 11:20 CET

Discord cryptocurrency information &amp; analysis bot.  
This is a very early version in development, and everything might not work as intended.  
Blame [CoinMarketCap](https://coinmarketcap.com/api/) if something breaks.  
**The bot is now hosted on a VPS. [Invite link](https://discordapp.com/oauth2/authorize?client_id=388025818720501760&scope=bot&permissions=211968)**.

Dependencies
```
npm install discord.js
```

Configuration
- Open *auth.json* and replace **token** with your Discord app's token found [here](https://discordapp.com/developers/applications/me).  

List of commands
```
General
;prefix [character] - set your preferred command prefix

Cryptocurrency
;top # - check top # coins' price
;coin [ticker] - compressed info about a coin
;price [ticker] - check price of a coin
;mcap [ticker] - check market cap of a coin
;convert [amount] [from] [to] - converts amount of first coin to another coin
;chart [ticker] [arguments] - view coin's chart (Soon™)
```
  
Functionality being added  
- [X] basic functionality (1/12/2017)
- [X] rich embeds (7/12/2017)
- [X] conversions (3/12/2017)
- [ ] charts
- [ ] fixing bugs & making new ones

If you would like to thank me for saving you ~0.0152 seconds by not having to open your browser   
```
BTC: 1PG1KN9NFjgCZReB5KhgViKqQpqUmpA2tS
ETH: 0x0D329AaAB772E0a3F56bC7C3B7470Df4Ed2f3cC3
LTC: LRqe2mMhScnLNfkWpHNXanhL6NYr4vYjSc
```  
Life made easier by  

* [discord.js](https://discord.js.org/), by @hydrabolt  

I'd appreciate if you tag me when copying my work. :)
