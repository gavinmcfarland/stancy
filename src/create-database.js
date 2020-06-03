import preprocess from './process-content';
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

const type = {
	is: {
		file: function(item) {
			if (/\..+$/.test(item)) {
				return item.split('.')[0];
			} else {
				return false;
			}
		},
		folder: function(item) {
			if (!/\..+$/.test(item)) {
				return item;
			} else {
				return false;
			}
		},
		singular: function(item) {
			return pluralize.isSingular(item);
		},
		plural: function(item) {
			return pluralize.isPlural(item);
		},
		index: function(value) {
			return /^index..+$/.test(value);
		},
		collection: function(source, value) {
			let isCollection = false;
			if (type.is.folder(value)) {
				isCollection = true;
			}
			// console.log(value)
			return isCollection;
		},
		item: function(source, value) {
			let isItem = false;
			if (type.is.file(value) || type.has.index(source, value)) {
				isItem = true;
			}
			return isItem;
		},
		hidden: function(value) {
			return /^_/.test(value);
		}
	},
	has: {
		index: function(source, value) {
			let hasIndex = false;
			if (type.is.folder(value)) {
				fs.readdirSync(path.join(source + value)).map((value, index) => {
					if (type.is.index(value)) {
						hasIndex = true;
					}
				});
			}

			return hasIndex;
		},
		children: function(source, value) {
			let hasChildren = false;
			if (type.is.folder(value)) {
				fs.readdirSync(path.join(source + value)).map((value, index) => {
					hasChildren = true;
				});
			}

			return hasChildren;
		}
	}
};

function createResrouce(dir, value, index, parent, root) {
	// If thing is hidden don't return resource
	if (type.is.hidden(value)) {
		return;
	}

	let resource = {
		_index: index,
		// _file: value,
		_name: value.split('.')[0]
	};

	// Create slug
	let slug = value.split('.')[0];
	if (value === 'home') {
		slug = '';
	}

	// Add url
	let newDir = dir.replace(root.replace(path.sep, ''), '');
	resource.url = path.join(newDir + slug);

	// Add source
	resource._source = path.join(dir + slug);

	if (type.is.singular(value)) {
		// resource._type = "item"
	}

	if (type.is.folder(value) && !type.has.index(dir, value)) {
		// resource._type = "collection"
	}

	// Add name of resource whether it be an item or a collection.
	if (type.is.item(dir, value)) {
		resource._collection = parent;
		resource._type = parent || value.split('.')[0];
	}

	if (type.is.folder(value)) {
		let subDir = path.join(dir + value + '/');
		let parent = value;
		fs.readdirSync(subDir).map((value, index) => {
			createResrouce(subDir, value, index, parent, root);
		});
	}

	// Get content

	// if (type.is.singular(value)) {
	// 	Object.assign(resource, preprocess(dir, value))
	// }

	// Apply content from file
	if (type.is.file(value)) {
		Object.assign(resource, preprocess(dir, value));
	}

	// Apply content from index file
	if (type.is.folder(value) && !type.is.item(dir, value)) {
		let subDir = path.join(dir + value + '/');
		let indexContent = '';
		fs.readdirSync(dir).map((value, index) => {
			if (/\index..+$/.test(value)) {
				indexContent = preprocess(dir, value);
			}
		});
		Object.assign(resource, indexContent);
	}

	// Add children of folder to resource
	if (type.is.folder(value)) {
		let subDir = path.join(dir + value + '/');
		let parent = value;

		resource._children = [];

		fs.readdirSync(path.join(dir + value)).map((value, index) => {
			if (!type.is.index(value)) {
				resource._children.push(createResrouce(subDir, value, index, parent, root));
			}
		});
	}

	return resource;
}

function createDatabase(dir) {
	let root = dir;

	let database = fs.readdirSync(dir).map((value, index) => {
		return createResrouce(dir, value, index, null, root);
	});

	return database;
}

export function database(dir) {
	return createDatabase(dir);
}

export function write(dir) {
	let db = JSON.stringify(createDatabase(dir), null, '\t');
	fs.writeFile('db.json', db, (err) => {
		if (err) throw err;
		// console.log('The file has been saved!');
	});
}
