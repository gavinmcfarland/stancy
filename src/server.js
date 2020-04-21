// server.js
import express from 'express'
import escape from 'html-escape'
import jsonata from "jsonata";
import { database, write } from './create-database.js'

// async function getContent(dataset, resource) {
//     let input = `*.${resource}[_id == 0]{_file}`
//     let tree = parse(input)
//     let value = await evaluate(tree, { dataset })
//     let result = await value.get()

//     return result
// }

function isObjectEmpty(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object
}


async function getContent(dataset, resource, resource2, query) {
	var expression = jsonata(`**[_type="${resource}"]`);
	if (resource && !resource2) {
		if (query) {
			let array = []
			for (let [key, value] of Object.entries(query)) {
				let string = `[${key}=${value}]`
				array.push(string)
			}
			expression = jsonata(`**[_type="${resource}"]${array.toString()}`);
		}

		return expression.evaluate(dataset);
	}

	if (resource && resource2) {
		if (query) {
			let array = []
			for (let [key, value] of Object.entries(query)) {
				let string = `[${key}=${value}]`
				array.push(string)
			}
			expression = jsonata(`**[_type="${resource}"][_name="${resource2}"]${array.toString()}`);
		}

		return expression.evaluate(dataset);

	}

	if (!resource || !resource2) {
		if (query) {
			if (isObjectEmpty(query)) {

				return dataset
			}
			let array = []
			for (let [key, value] of Object.entries(query)) {
				let string = `[${key}=${value}]`
				array.push(string)
			}

			expression = jsonata(`**${array.toString()}`);
			return expression.evaluate(dataset);
		}


	}

}

function serve(dir) {
	const db = database(dir)

	const app = express()
	const port = 3000

	app.get('/', (req, res) => {
		getContent(db, null, null, req.query).then(value => {
			res.json(value)
		})
	})


	app.get('/:resource', (req, res) => {
		getContent(db, req.params.resource, null, req.query).then(value => {
			res.json(value)
		})
	})

	app.get('/:resource/:resource2', (req, res) => {
		getContent(db, req.params.resource, req.params.resource2, req.query).then(value => {
			res.json(value)
		})
	})

	app.listen(port, () => {
		console.log(`Server listening at http://localhost:${port}`)
	})
}

const base = 'http://localhost:3000';

function send({ method, path, data, token }) {
	const fetch = process.browser ? window.fetch : require('node-fetch').default;

	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	return fetch(`${base}/${path}`, opts)
		.then(r => r.text())
		.then(json => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

function get(path, token) {
	return send({ method: 'GET', path, token });
}



export default {
	database,
	write,
	serve,
	get
}

