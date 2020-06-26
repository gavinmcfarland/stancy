import smarkt from 'smarkt';
import YAML from 'yaml';
import JSON5 from 'json5';
import fs from 'fs';
import path from 'path';
import frontmatter from 'front-matter';
import toml from 'toml';
import hjson from 'hjson';

// const smarkt = require('smarkt');
// const YAML = require('yaml');
// const JSON5 = require('json5');
// const fs = require('fs');
// const path = require('path');
// const frontmatter = require('front-matter');

function getFileExt(item) {
	if (item.match(/\.([0-9a-z]+)(?:[?#]|$)/i)) return item.match(/\.([0-9a-z]+)(?:[?#]|$)/i)[1];
}

function parseToml(dir, item) {
	if (!process.browser) {
		if (getFileExt(item) === 'toml') {
			let content = fs.readFileSync(path.join(dir, item), 'utf8');

			return toml.parse(content);
		}
	}
}

// function parseJson(dir, item) {
// 	if (!process.browser) {
// 		if (getFileExt(item) === 'json') {
// 			let content = fs.readFileSync(path.join(dir, item), 'utf8');

// 			return JSON.parse(content);
// 		}
// 	}
// }

function parseHjson(dir, item) {
	if (!process.browser) {
		if (getFileExt(item) === 'hjson' || getFileExt(item) === 'json') {
			let content = fs.readFileSync(path.join(dir, item), 'utf8');

			return hjson.parse(content);
		}
	}
}

function parseJson5(dir, item) {
	if (!process.browser) {
		if (getFileExt(item) === 'json5') {
			let content = fs.readFileSync(path.join(dir, item), 'utf8');

			return JSON5.parse(content);
		}
	}
}

function parseMarkdown(dir, item) {
	if (!process.browser) {
		// Removed automatic parsing of markdown, so that this can be done per domain
		if (getFileExt(item) === 'md') {
			var file = fs.readFileSync(path.join(dir, item), 'utf8');
			const { attributes, body } = frontmatter(file);

			let object = {
				...attributes,
				content: body
			};

			return object;
		}
	}
}

function parseText(dir, item) {
	if (!process.browser) {
		if (getFileExt(item) === 'txt') {
			let object = smarkt.parse(fs.readFileSync(path.join(dir, item), 'utf8'));

			return object;
		}
	}
}

function parseYaml(dir, item) {
	if (!process.browser) {
		if (getFileExt(item) === 'yml' || getFileExt(item) === 'yaml') {
			let object = YAML.parse(fs.readFileSync(path.join(dir, item), 'utf8'));

			return object;
		}
	}
}

// function parseCsson(dir, item) {
// 	if (getFileExt(item) === 'csson') {
// 		let object = csson(fs.readFileSync(path.join(dir, item), 'utf8'));

// 		return object;
// 	}
// }

export default function parseContent(dir, item) {
	let result =
		// parseJson(dir, item) ||
		parseHjson(dir, item) ||
		parseMarkdown(dir, item) ||
		parseText(dir, item) ||
		parseYaml(dir, item) ||
		parseJson5(dir, item) ||
		parseToml(dir, item);
	// parseCsson(dir, item);
	return result;
}
