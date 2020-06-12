import http from 'http';
import express from 'express';
import cors from 'cors';
import chokidar from 'chokidar';
import { createDatabase } from './create-database.js';
import getContent from './get-content.js';
import Client from './client.js';
// import routes from './routes.js';

export default function stancy(source) {
	class Stancy {
		constructor(source) {
			this._source = source;
		}
		server(port, base) {
			port = port || 3000;
			base = base || '/';

			this._local = `http://localhost:${port}${base}`;

			var source = this._source;
			var server;
			var database;

			function app(base) {
				var app = express();
				database = createDatabase(source);

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

			function start() {
				server = http.createServer(app(base));
				server.listen(port, () => {
					console.log(`Server listening at http://localhost:${port}${base}`);
				});
			}

			function restart() {
				server.close();
				console.log('API server restarting');
				start();
			}

			function watch() {
				start();
				chokidar
					.watch(source, {
						ignored: /(^|[/\\])\../, // ignore dotfiles
						persistent: true
					})
					.on('change', () => {
						restart();
					});
			}

			watch();
		}
		client(options) {
			if (this._local) {
				return new Client(options, this._local);
			} else {
				return new Client(options);
			}
		}
		database() {
			var source = this._source;
			return createDatabase(source);
		}
	}

	return new Stancy(source);
}

// stancy('conetnt/').server();
