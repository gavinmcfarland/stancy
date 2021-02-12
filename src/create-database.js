import preprocess from './process-content.js';
import fs from 'fs';
import path from 'path';
import pluralize from 'pluralize';

// TODO: Need to add option in API to specific folder for images
// FIXME: Check that paths for images are correct
// TODO: Check that creating images and dir works when used in another project

const type = {
	is: {
		image(item) {
			if (/.jpg|.jpeg|.png/.test(item)) {
				return item
			}
			else {
				return false
			}
		},
		file(item) {
			if (/\.(?!png|jpg|jpeg).+$/.test(item)) {
				return item.split('.')[0];
			} else {
				return false;
			}
		},
		folder(item) {
			if (!/\..+$/.test(item)) {
				return item;
			} else {
				return false;
			}
		},
		singular(item) {
			return pluralize.isSingular(item);
		},
		plural(item) {
			return pluralize.isPlural(item);
		},
		index(value) {
			return /^index..+$/.test(value);
		},
		collection(source, value) {
			let isCollection = false;
			if (type.is.folder(value)) {
				isCollection = true;
			}
			// console.log(value)
			return isCollection;
		},
		item(source, value) {
			let isItem = false;
			if (type.is.file(value) || type.has.index(source, value)) {
				isItem = true;
			}
			return isItem;
		},
		hidden(value) {
			return /^_/.test(value);
		}
	},
	has: {
		index(source, value) {
			let hasIndex = false;
			if (type.is.folder(value)) {
				fs.readdirSync(path.join(source + value)).map((value) => {
					if (type.is.index(value)) {
						hasIndex = true;
					}
				});
			}

			return hasIndex;
		},
		children(source, value) {
			let hasChildren = false;
			if (type.is.folder(value)) {
				fs.readdirSync(path.join(source + value)).map(() => {
					hasChildren = true;
				});
			}

			return hasChildren;
		}
	}
};

function createResource(dir, value, index, parent, root) {

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
			createResource(subDir, value, index, parent, root);
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
	// if (type.has.index(dir, value)) {
	// 	// let subDir = path.join(dir + value + '/');
	// 	let indexContent = '';
	// 	fs.readdirSync(dir).map((value) => {

	// 		if (/index..+$/.test(value)) {

	// 			indexContent = preprocess(dir, value);
	// 		}
	// 	});
	// 	Object.assign(resource, indexContent);
	// }

	// If it's a folder
	if (type.is.folder(value)) {

		let subDir = path.join(dir + value + '/');
		let parent = value;


		var array = [];
		var images = []

		// Loop through its contents
		fs.readdirSync(path.join(dir + value)).map((value, index) => {

			if (type.is.singular(parent)) {
				// If parent is singular
				resource._type = parent

				// If it's an image
				if (type.is.image(value)) {
					images.push({ url: path.join("images", resource.url, value) });

					// Copy file to another destination
					var oldPath = path.join(process.cwd(), subDir, value)
					// resource.url returns / for index, need to check if this is correct AND if below need changing
					var newPath = path.join(process.cwd(), "images", resource.url, value)

					if (!fs.existsSync(path.join(process.cwd(), "images"))) {
						fs.mkdirSync(path.join(process.cwd(), "images", resource.url), { recursive: true });
					}

					fs.copyFile(oldPath, newPath, (err) => {
						if (err) throw err;
						console.log('source.txt was copied to destination.txt');
					});
				}

				if (type.is.index(value)) {
					// If item is index file then apply contents to parent
					Object.assign(resource, preprocess(subDir, value));
				} else {
					// Else apply files as properties to parent
					Object.assign(resource, { [value.split('.')[0]]: preprocess(subDir, value) });

					if (type.has.index(subDir, value)) {
						let previous = value
						fs.readdirSync(subDir + value).map((value) => {

							if (type.is.index(value)) {

								// Temporary fix for folders that contain index file
								Object.assign(resource, { [previous]: preprocess(subDir + previous, value) });
							}
						})
					}

				}


			}

			else {
				// If parent is plural
				if (!type.is.index(value)) {
					array.push(createResource(subDir, value, index, parent, root));
				}
				else {
					Object.assign(resource, preprocess(subDir, value));
				}

			}
		});
		if (array.length > 0) {
			resource[parent] = array;
		}

		if (images.length > 0) {
			resource.images = images
		}




	}

	// console.log(resource)

	return resource;
}

export default function createDatabase(dir) {
	let root = dir;

	let database = fs.readdirSync(dir).map((value, index) => {
		return createResource(dir, value, index, null, root);
	});

	return database;
}
