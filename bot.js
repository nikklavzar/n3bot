/* eslint-disable no-console */
/* eslint-disable angular/interval-service */
/* eslint-disable node/no-missing-require */
/* eslint-disable node/no-unpublished-require */

// credits: github.com/n3onis

const discord = require("discord.js"); // https://discord.js.org/
const cmc_api = require("cmc-info"); // https://github.com/n3onis/cmc-info
const auth = require("./auth.json");

const client = new discord.Client();

const cmc = new cmc_api("YOUR_API_KEY");
let prefix = ';';

client.on('ready', () => {
  console.log( `Logged in as ${client.user.tag}!` );
  updateStatus();
  setInterval(updateStatus, 300000); // update status every 5 minutes
});

client.on('message', msg => {
    if ( msg.content.substring(0, 1) == prefix ) {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];
        console.log(`Requested '${cmd}'. (${msg.guild.name}#${msg.channel.name} - ${msg.guild.id})`);
       
        args = args.splice(1);
        switch(cmd) {

            case 'price':
                if(args[0]) {
                    cmc.requestCoin(args[0], 'price')
                        .then(data => {
                            msg.channel.send(`${args[0].toUpperCase()}: $${numberFormat(data)}`);
                        })
                        .catch(error => {
                            msg.channel.send(`API Error.`);
                            console.error(error);
                        });
                } else {
                    msg.channel.send("Undefined.");
                }
                break;

            case 'info':
                if (args[0]) {
                    cmc.requestCoin(args[0])
                        .then(data => {
                            let id = data['id'];
                            let name = data['name'];
                            let rank = data['cmc_rank'];
                            let supply = numberFormat(data['circulating_supply']);
                            let price = numberFormat(data['quote']['USD']['price']);
                            let volume_24h = numberFormat(data['quote']['USD']['volume_24h']);
                            let percent_change_1h = numberFormat(data['quote']['USD']['percent_change_1h']);
                            let percent_change_24h = numberFormat(data['quote']['USD']['percent_change_24h']);
                            let percent_change_7d = numberFormat(data['quote']['USD']['percent_change_7d']);
                            let market_cap = numberFormat(data['quote']['USD']['market_cap']);
                            let last_updated = data['last_updated'];
                            let chunk = `**Rank**: ${rank} \n\n**Circulating supply**: ${supply} \n**Price**: $${price} \n**Volume 24H**: ${volume_24h} \n**Change 1H**: ${percent_change_1h}% \n**Change 24H**: ${percent_change_24h}% \n**Change 7D**: ${percent_change_7d}% \n\n**Market cap**: $${market_cap}`;
                            msg.channel.send({
                                embed: {
                                    color: 3447003,
                                    thumbnail: {
                                        url: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`
                                    },
                                    fields: [
                                        {
                                            name: name,
                                            value: chunk,
                                            inline: true
                                        },
                                    ],
                                    footer: {
                                        text: `Last updated: ${last_updated}`
                                    }
                                },
                            });
                        })
                        .catch(error => {
                            msg.channel.send(`API Error.`);
                            console.error(error);
                        });
                } else {
                    msg.channel.send("Undefined.");
                }
                break;

        }
	}
});

client.login(auth.token);

// Playing Bitcoin: $X,XXX.YY
function updateStatus() {
    cmc.requestCoin('BTC', 'price')
        .then(data => {
            client.user.setActivity(`Bitcoin: $${numberFormat(data)}`);
        })
        .catch(error => {
            client.user.setActivity(`API Error.`);
            console.error(error);
        });
}

function numberFormat(x) {
    x = Math.round(x * 100) / 100;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}