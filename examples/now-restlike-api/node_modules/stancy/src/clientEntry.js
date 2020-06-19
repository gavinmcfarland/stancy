import Client from './client.js';

// Just a copy of main application without server and database functionality. The main application creates the database on the server and starts the api server. This file is then called in the browser and used to access content from the local server for client side rendering.

export default function stancy(source) {
	class Stancy {
		constructor(source) {
			if (source) {
				this._source = source;
			}
		}
		client(production) {
			// local server
			var local = 'http://localhost:4000/';
			return new Client(production, local, this._source);
		}
	}

	return new Stancy(source);
}
