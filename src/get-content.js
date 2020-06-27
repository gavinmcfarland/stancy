import jsonata from 'jsonata';
// const jsonata = require('jsonata');

function isObjectEmpty(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export default async function getContent(database, { resource1, resource2, query }) {
	var expression = jsonata(`**[_type="${resource1}"]`);
	if (resource1 && !resource2) {

		if (query) {
			let array = [];
			for (let [key, value] of Object.entries(query)) {
				let string = `[${key}=${value}]`;
				array.push(string);
			}
			expression = jsonata(`**[_type="${resource1}"]${array.toString()}`);
		}

		return expression.evaluate(database);
	}

	if (resource1 && resource2) {
		if (query) {
			let array = [];
			for (let [key, value] of Object.entries(query)) {
				let string = `[${key}=${value}]`;
				array.push(string);
			}
			expression = jsonata(`**[_type="${resource1}"][_name="${resource2}"]${array.toString()}`);
		}

		return expression.evaluate(database);
	}

	if (!resource1 || !resource2) {
		if (query) {
			if (isObjectEmpty(query)) {
				return database;
			}
			let array = [];
			for (let [key, value] of Object.entries(query)) {
				let string = `[${key}=${value}]`;
				array.push(string);
			}

			expression = jsonata(`**${array.toString()}`);
			return expression.evaluate(database);
		}
	}
}
