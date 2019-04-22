// credits: github.com/n3onis

const discord = require("discord.js"); // https://discord.js.org/
const cmc_api = require("cmc-info"); // https://github.com/n3onis/cmc-info
const auth = require("./auth.json");

const client = new discord.Client();

const cmc = new cmc_api("API_KEY_HERE");
var prefix = ';';

client.on('ready', () => {
  console.log( `Logged in as ${client.user.tag}!` );
  updateStatus();
  setInterval(updateStatus, 300000); // update status every 5 minutes
});

client.on('message', msg => {
  	if ( msg.content.substring(0, 1) == prefix ) {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
        console.log(`Requested '${cmd}'. (${msg.guild.name}#${msg.channel.name} - ${msg.guild.id})`);
       
        args = args.splice(1);
        switch(cmd) {

            // TODO: commands

        }
	}
});

client.login(auth.token);

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

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + min + ':' + sec + ' CE(S)T';
  return time;
}
