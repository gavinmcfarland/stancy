// server.js
import express from 'express'
import { parse, evaluate } from 'groq-js'
import escape from 'html-escape'
import jsonata from "jsonata";
import { database, write } from './create-database2.js'

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


async function getContent(dataset, resource, query) {
	var expression = jsonata(`**[_type="${resource}"]`);
	if (resource) {

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

	else {
		console.log(query)
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
		getContent(db, null, req.query).then(value => {

			// console.log(value)
			// console.log(req.query)
			res.send(`<pre>${escape(JSON.stringify(value, null, '\t'))}</pre>`)
		})


	})


	app.get('/:resource', (req, res) => {
		let resource = req.params.resource
		console.log(req.query)
		getContent(db, resource, req.query).then(value => {

			// console.log(value)

			res.send(`<pre>${escape(JSON.stringify(value, null, '\t'))}</pre>`)
		})


	})

	app.listen(port, () => {
		console.log(`Server listening at http://localhost:${port}`)
	})
}



export default {
	database,
	write,
	serve
}

