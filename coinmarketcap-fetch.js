// simple coinmarketcap data fetcher
// credits: github.com/n3onis
// 6 Dec 2017

const request = require('request');

class coinmarketcap {

	// basic api
	constructor() {
		this.convert = 'EUR'; // check 'https://coinmarketcap.com/api/' for all possible currencies
		this.apiurl = `http://api.coinmarketcap.com/v1/ticker/?convert=${this.convert}`;
		this.apiurl_global = `http://api.coinmarketcap.com/v1/global/?convert=${this.convert}`;
	}

	_getjsonglobal ( url, callback ) {
		request( this.apiurl_global+url, function( error, response, body ) {
			if( error ) { 
				callback( false );
				return this;
			}
			if( response && response.statusCode == 200 ) {
				callback( JSON.parse( body ) );
			} else {
				callback( false );
				return this;
			}
		});
	}

	// retrieve our json api
	_getjson( url, callback ) {
		request( this.apiurl+url, function( error, response, body ) {
			if( error ) { 
				callback( false );
				return this;
			}
			if( response && response.statusCode == 200 ) {
				callback( JSON.parse( body ) );
			} else {
				callback( false );
				return this;
			}
		});
	}

	// find coin id through coin symbol or id (e.g. 'btc' => 'bitcoin')
	_find( symbol, json ) {
		return json.filter(
			function( json ) {
				return json.symbol == symbol.toUpperCase() || json.id == symbol.toLowerCase();
			}
		)
	}

	// get full coin list from coinmarketcap
	_coinlist( callback ) {
		if( callback ) {
			this._getjson( '&limit=0', callback );
			return this;
		} else {
			return false;
		}
	}

	_global ( callback ) {
		if( callback ) {
			this._getjsonglobal( '', callback );
			return this;
		} else {
			return false;
		}
	}

	// get single coin's data
	get( symbol, callback ) {
		this._coinlist( coins => {
			var found = this._find( symbol, coins );
			callback( found[0] );
		})
	}

	// example usage:
	// cmc.get('btc', data => {
	// 		console.log(data['price_usd']);
	// });

	getall( callback ) {
		this._coinlist(coins => {
			callback( coins );
		}); 
	}

	// example usage:
	// cmc.getall(data => {
	// 		console.log(data[0]['price_usd']);
	// });

	getglobal ( callback ) {
		this._global(data => {
			callback( data );
		}); 
	}

}

module.exports = coinmarketcap;