import { singular } from 'pluralize'
import parseContent from './process-content'
const fs = require('fs')
const path = require('path')
const pluralize = require('pluralize')



function isFile(item) {
	if (/\..+$/.test(item)) {
		return item.split('.')[0]
	}
	else {
		return false
	}
}

function isFolder(item) {
	if (!(/\..+$/.test(item))) {
		return item
	}
	else {
		return false
	}
}

function createArray(dir, item) {
	if (isFolder(item)) {
		let array = []
		dir = path.join(dir, item)

		fs.readdirSync(dir).map((item, index) => {
			if (!(/\index..+$/.test(item))) {
				let object = createObject(dir, item, index)
				if (object !== undefined) {
					array.push(object)
				}
			}

		})

		return array
	}
}

function createObject(dir, item, index, level = 1) {

	if (/^_/.test(item)) {
		return undefined
	}
	let object = {}

	let newObject = {}

	let resourceContent = {}
	let resourceMeta = {
		_id: index,
		_name: item,
		_type: "item"
	}




	Object.assign(newObject, resourceMeta)


	if (isFile(item)) {
		Object.assign(object, parseContent(dir, item))
	}
	else {


		let containsChildren = false
		let hasIndex = false
		let subDir = path.join(dir, item)

		fs.readdirSync(subDir).map((item) => {
			if (!(/\index..+$/.test(item))) {
				containsChildren = true
			}
			else {
				hasIndex = true
				resourceContent = parseContent(subDir, item)
				Object.assign(object, resourceContent)
			}
		})

		if (pluralize.isSingular(item) && !hasIndex) {
			let childObject = {}
			object._type = "collection"

			fs.readdirSync(subDir).map((item, index) => {

				let name = item.split('.')[0]
				resourceContent = parseContent(subDir, item)
				childObject[name] = resourceContent

			})



			Object.assign(object, childObject)
		}
		else {



			if (containsChildren) {
				object.children = createArray(dir, item, index)
			}
			// if (hasIndex) {
			//     object.content = hasIndex
			// }

			if (!hasIndex) {
				object = undefined
			}




		}


	}

	if (level > 0) {
		newObject[item.split('.')[0]] = object
		object = newObject
	}



	level++
	return object
}


function createDatabase(dir) {


	// For each item in array
	let database = fs.readdirSync(dir).map((item, index) => {


		// Create an collection
		let folder = isFolder(item)
		let file = isFile(item)
		let plural = pluralize.isPlural(item)
		let singular = pluralize.isSingular(item)

		if (folder && plural) {
			return {
				[folder]: createArray(dir, item)
			}
		}
		else if (folder && singular) {
			return {
				[folder]: createObject(dir, folder, index, 0)
			}
		}
		else {
			return {
				[file]: createObject(dir, item, index, 0)
			}
		}

	})

	return Object.assign({}, ...database)

}

export function database(dir) {
	return createDatabase(dir)
}


export function write(dir) {
	let db = JSON.stringify(createDatabase(dir), null, '\t')
	fs.writeFile('db.json', db, (err) => {
		if (err) throw err;
		// console.log('The file has been saved!');
	});
}


