// server.js
import express from 'express';
import { database, write } from './create-database.js';
import getContent from './get-content.js';
const chokidar = require('chokidar');

const watcher = chokidar.watch('content/', {
	ignored: /(^|[\/\\])\../, // ignore dotfiles
	persistent: true
});

function serve(dir, port, base) {
	port = port || 3000;
	if (!base) {
		base = '/';
	}

	var server = '';

	var db;

	function createApp() {
		var app = express();
		db = database(dir);

		// Format repsonse to have spaces and indentation
		app.set('json spaces', 4);

		app.get(base, (req, res) => {
			getContent(db, {
				resource1: null,
				resource2: null,
				query: req.query
			}).then((value) => {
				if (value) {
					res.json(value);
				} else {
					res.send(`No value that matches query \n ${req.url}`);
				}
			});
		});

		app.get(base + ':resource1', (req, res) => {
			getContent(db, {
				resource1: req.params.resource1,
				resource2: null,
				query: req.query
			}).then((value) => {
				if (value) {
					res.json(value);
				} else {
					res.send(`No value that matches query \n ${req.url}`);
				}
			});
		});

		app.get(base + ':resource1/:resource2', (req, res) => {
			getContent(db, {
				resource1: req.params.resource1,
				resource2: req.params.resource2,
				query: req.query
			}).then((value) => {
				if (value) {
					res.json(value);
				} else {
					res.send(`No value that matches query \n ${req.url}`);
				}
			});
		});

		return app;
	}

	function start() {
		server = require('http').createServer(createApp());
		server.listen(port, () => {
			console.log(`Server listening at http://localhost:${port}${base}`);
		});

		// app.listen(port, () => {
		// 	console.log(`Server listening at http://localhost:${port}${base}`);
		// });
	}

	function restart() {
		console.log('restart');
		server.close();
		console.log('start');
		start();
	}

	start();

	watcher.on('change', (path) => {
		restart();
	});
}

function send({ base, method, path, data, token }) {
	const fetch = process.browser ? window.fetch : require('node-fetch').default;

	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	return fetch(`${base}/${path}`, opts).then((r) => r.text()).then((json) => {
		try {
			return JSON.parse(json);
		} catch (err) {
			console.log(`${base}/${path}`);
			return json;
		}
	});
}

function get(base, path, token) {
	return send({ method: 'GET', path, token, base });
}

export default function(source) {
	return {
		serve: function(port, base) {
			return serve(source, port, base);
		},
		get: function(path, token) {
			return get(path, token);
		},
		database: function() {
			return database(source);
		}
	};
}

// export default {
// 	grab: getContent,
// 	database,
// 	write,
// 	serve,
// 	get
// }
