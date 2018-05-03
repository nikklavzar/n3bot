// simple coinmarketcap data fetcher
// credits: github.com/n3onis
// 6 Dec 2017

const request = require('request');

class coinmarketcap {

	// basic api
	constructor() {
		this.apiurl = `http://api.coinmarketcap.com/v2/ticker/?convert=`;
		this.apiurl_global = `http://api.coinmarketcap.com/v2/global/?convert=BTC`;
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
	_coinlist( convert, callback ) {
		if( callback ) {
			this._getjson( convert + '&limit=0', callback );
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
	get( symbol, convert, callback ) {
		this._coinlist( convert, coins => {
			var found = this._find( symbol, coins );
			callback( found[0] );
		})
	}

	// example usage:
	// cmc.get('btc', data => {
	// 		console.log(data['price_usd']);
	// });

	getall( convert, callback ) {
		this._coinlist( convert, coins => {
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