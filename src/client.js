import nodeFetch from 'node-fetch';

function findById(object, key, callback) {
	var property;

	for (property in object) {
		if (property === key) {
			object[key] = callback(object[key]);
		} else {
			if (typeof object[property] === 'object') {
				findById(object[property], key, callback);
			}
		}
		// if (object.hasOwnProperty(property) && typeof object[property] === 'object') {

		// }
	}
}

class Client {
	constructor(production, local, source) {
		if (source) {
			this._source = source;
		}

		this._options = {
			production
		};
		if (local) {
			Object.assign(this._options, { preview: local });
		}
	}
	_process(data, callback) {
		data = JSON.parse(data);
		if (callback.preprocess) {
			if (callback.preprocess[0] === 'content') {
				if (Array.isArray(data)) {
					data.map((item) => {
						// findById(item, 'content');
						if (item.content) {
							findById(item, 'content', callback.preprocess[1]);
						}
					});
				} else {
					findById(data, 'content', callback.preprocess[1]);
				}
			}

			if (callback.preprocess[0] === 'item') {
				if (Array.isArray(data)) {
					data.map((item) => {
						return callback.preprocess[1](item);
					});
				} else {
					data = callback.preprocess[1](data);
				}
			}

			if (callback.preprocess[0] === 'collection') {
				if (Array.isArray(data)) {
					data = callback.preprocess[1](data);
				}
			}

			return data;
		} else {
			return data;
		}
	}
	get(path) {
		var options = this._options;

		const fetch = process.browser ? window.fetch : nodeFetch;

		var base;

		if (process.env.NODE_ENV === 'development') {
			if (options.preview && this._source !== 'undefined') {
				base = options.preview;
			} else {
				base = options.production;
			}
		} else {
			base = options.production;
		}

		console.log('browser - ' + !process.browser);

		console.log('source - ' + this._source);

		console.log('preview - ' + options.preview);

		console.log(`${base}${path}`);

		return fetch(`${base}${path}`).then((res) => res.text()).then((json) => {
			try {
				var result = this._process(json, options);

				return result;
			} catch (err) {
				return json;
			}
		});
	}
	preprocess(type, callback) {
		Object.assign(this._options, { preprocess: [ type, callback ] });
	}
}

export default Client;
