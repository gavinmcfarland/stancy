const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')
const smarkt = require('smarkt')
const YAML = require('yaml')
const JSON5 = require('json5')
// const csson = require('@csson/csson')

function getFileExt(item) {
	if (item.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)) return item.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1]
}

function parseJson(dir, item) {
	if (getFileExt(item) === "json") {
		let content = fs.readFileSync(path.join(dir, item), 'utf8')

		return JSON.parse(content)
	}
}

function parseJson5(dir, item) {
	if (getFileExt(item) === "json5") {
		let content = fs.readFileSync(path.join(dir, item), 'utf8')

		return JSON5.parse(content)
	}
}

function parseMarkdown(dir, item) {
	if (getFileExt(item) === "md") {
		let object = {
			content: marked(fs.readFileSync(path.join(dir, item), 'utf8'))
		}

		return object
	}
}

function parseText(dir, item) {
	if (getFileExt(item) === "txt") {

		let object = smarkt.parse(fs.readFileSync(path.join(dir, item), 'utf8'))

		return object
	}
}

function parseYaml(dir, item) {
	if (getFileExt(item) === "yml" || getFileExt(item) === "yaml") {

		let object = YAML.parse(fs.readFileSync(path.join(dir, item), 'utf8'))

		return object
	}
}

function parseCsson(dir, item) {
	if (getFileExt(item) === "csson") {

		let object = csson(fs.readFileSync(path.join(dir, item), 'utf8'))

		return object
	}
}

export default function parseContent(dir, item) {
	let result = parseJson(dir, item) || parseMarkdown(dir, item) || parseText(dir, item) || parseYaml(dir, item) || parseJson5(dir, item) || parseCsson(dir, item)
	return result
}


