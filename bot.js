const discord = require("discord.js");
const coinmarketcap = require('./coinmarketcap-fetch.js');
const auth = require('./auth.json');

const client = new discord.Client();

const cmc = new coinmarketcap();
var prefix = ';';

client.on('ready', () => {
  console.log( `Logged in as ${client.user.tag}!` );
});

client.on('message', msg => {
  	if ( msg.content.substring(0, 1 ) == prefix ) {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
        	case 'prefix':

                if( args[0] == undefined || args[0].length != 1 ) {
                    msg.channel.send( `Usage: ${prefix} \`prefix []\`.` );

                } else {
                    prefix = args[0];
                    msg.channel.send( `Prefix changed to \`${prefix}\`.` );
                }

            break;

            case 'price':

            	if(args[0]) {
	                cmc.get( args[0], coin => {
	                	if(coin) {
	                		var price_usd = coin['price_usd'];
	                		msg.channel.send( `${coin['symbol']} price: ${price_usd}` );
	                	} else {
	                		msg.channel.send( 'Not found.' );
	                	}
	                });
            	} else {
            		msg.channel.send('Undefined symbol.');
            	}
                
            break;

            case 'top':

                if( !args[0] ) {
                    args[0] = 10;
                }
                
                var chunk = '';
                cmc.getall(coins => {
                	for( var i = 0; i < args[0]; i++ ) {
                		chunk += `${i+1}. **${coins[i]['name']}** - $${coins[i]['price_usd']}\n`;
                	}

                	msg.channel.send({
	                	embed: {
	                		color: 3447003,
	                		fields: [
	                			{
	                				name: `Top ${args[0]} coins`,
	                				value: chunk,
	                				inline: true
	                			},
	                		],
	                	},
                	});
                });

            break;

            case 'coin':

            if(args[0]) {

            	var price_eth;
        		cmc.get('eth', ethereum => {
        			price_eth = ethereum['price_btc'];
        		});

            	cmc.get(args[0], coin => {
            		if(coin) {
	            		var name = coin['name'];
	            		var rank = coin['rank'];
	            		var price_usd = `$${coin['price_usd']}`;
	            		var price_btc = `${coin['price_btc']} BTC`;
	        			price_eth = `${Math.round(coin['price_btc'] / price_eth * 100000000) / 100000000} ETH`;
	            		var volume = `$${numberFormat(coin['24h_volume_usd'])}`;
	            		var m_cap = `$${numberFormat(coin['market_cap_usd'])}`;
	            		var avail_supply = numberFormat(coin['available_supply']);
	            		var total_supply = numberFormat(coin['total_supply']);
	            		var max_supply = numberFormat(coin['max_supply']);
	            		var change_1h = `${coin['percent_change_1h']}%`;
	            		var change_24h = `${coin['percent_change_24h']}%`;
	            		var change_7d = `${coin['percent_change_7d']}%`;

	            		if(max_supply == null || max_supply == 0) {
	                        max_supply = '--';
	                    }

	                    var chunk = '**Rank**: ' + rank + '\n\n**Price USD**: ' + price_usd + '\n**Price BTC**: ' + price_btc + '\n**Price ETH**: ' + price_eth + '\n\n**Volume 24h**: ' + volume + '\n**Market Cap**: ' + m_cap + '\n**Available Supply**: ' + avail_supply + '\n**Total Supply**: ' + total_supply + '\n**Maximum Supply**: ' + max_supply + '\n\n**Change 1h**: ' + change_1h + '\n**Change 24h**: ' + change_24h + '\n**Change 7d**: ' + change_7d;

	                    msg.channel.send({
		                	embed: {
		                		color: 3447003,
		                		thumbnail: {
		                			url: `https://files.coinmarketcap.com/static/img/coins/32x32/${coin['id']}.png`
		                		},
		                		fields: [
		                			{
		                				name: coin['name'],
		                				value: chunk,
		                				inline: true
		                			},
		                		],
		                		footer: {
		                			text: `Last updated: ${timeConverter(coin['last_updated'])}`
		                		}
		                	},
	                	});
                	} else {
                		msg.channel.send('Not found.');
                	}
            	});
            } else {
            	msg.channel.send('Undefined.');
            }

            break;

            case 'convert':

            if(args[0] && args[1] && args[2]) {

            	var from, to, from_symbol, to_symbol;

            	cmc.get(args[1], _from => {
            		if(_from) {
            			from_symbol = _from['symbol'];
            			from = _from['price_btc'];
            			cmc.get(args[2], _to => {
		            		if(_to) {
		            			to_symbol = _to['symbol'];
		            			to = _to['price_btc'];
		            		} else {
		            			msg.channel.send('Not found.');
		            		}

		            		var conversion = args[0] * from / to;
		            		msg.channel.send(`${args[0]} ${from_symbol} = ${conversion} ${to_symbol}`);
	            		});
            		} else {
            			msg.channel.send('Not found.');
            		}
            	});

            	

            } else {
            	msg.channel.send('Undefined.');
            }
		}
	}
});

client.login(auth.token);

function numberFormat(x) {
    x = Math.round(x * 100) / 100;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + min + ':' + sec ;
  return time;
}