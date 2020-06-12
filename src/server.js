import http from 'http';
import express from 'express';
import cors from 'cors';
// const chokidar = require('chokidar');
import { createDatabase } from './create-database.js';
import getContent from './get-content.js';
// import routes from './routes.js';

export default function stancy() {
	class Stancy {
		constructor(source) {
			this._source = source;
		}
		_database(source) {
			return createDatabase(source);
		}
		_app(base) {
			var app = express();
			var database = this._database(this._source);

			// Apply CORS
			app.use(
				cors({
					origin: '*',
					methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
					preflightContinue: false,
					optionsSuccessStatus: 204
				})
			);

			// Format whitespace of responses
			app.set('json spaces', 4);

			// Apply routes
			// app.use(base, routes);

			app.get(base, (req, res) => {
				getContent(database, {
					resource1: null,
					resource2: null,
					query: req.query
				}).then((value) => {
					if (value) {
						res.json(value);
						console.log('0');
					} else {
						res.send(`No value that matches query \n ${req.url}`);
					}
				});
			});

			app.get(base + ':resource1', (req, res) => {
				getContent(database, {
					resource1: req.params.resource1,
					resource2: null,
					query: req.query
				}).then((value) => {
					if (value) {
						res.json(value);
						console.log('1');
					} else {
						res.send(`No value that matches query \n ${req.url}`);
					}
				});
			});

			app.get(base + ':resource1/:resource2', (req, res) => {
				getContent(database, {
					resource1: req.params.resource1,
					resource2: req.params.resource2,
					query: req.query
				}).then((value) => {
					if (value) {
						res.json(value);
						// console.log(value);
					} else {
						res.send(`No value that matches query \n ${req.url}`);
					}
				});
			});

			return app;
		}
		server(port, base) {
			port = port || 3000;
			base = base || '/';

			var server;

			function start() {
				server = http.createServer(this._app(base));
				server.listen(port, () => {
					console.log(`Server listening at http://localhost:${port}${base}`);
				});
			}

			// function restart() {
			// 	server.close();
			// 	console.log('API server restarting');
			// 	start();
			// }

			function watch() {
				start();
				// chokidar
				// 	.watch(this._source, {
				// 		ignored: /(^|[/\\])\../, // ignore dotfiles
				// 		persistent: true
				// 	})
				// 	.on('change', () => {
				// 		restart();
				// 	});
			}

			watch();
		}
		client() {
			console.log('client');
		}
		database() {
			console.log('database');
		}
	}

	return new Stancy();
}

// stancy('conetnt/').server();
