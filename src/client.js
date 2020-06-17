class Client {
	constructor(options, local, source) {
		this._source = source;
		this._options = options;
		if (local) {
			Object.assign(this._options, { preview: local });
		}
	}
	_process(data, callback) {
		data = JSON.parse(data);
		if (callback.preprocess) {
			var collection = data;
			// When res is a collection/array
			if (Array.isArray(collection)) {
				collection.map((item) => {
					// Lets user change each item of collection
					if (item) {
						callback.preprocess({ item: item, collection: [] });
					}
				});
				// Lets user change whole collection
				callback.preprocess({ item: {}, collection: collection });
				data = collection;
			} else {
				// When res is an item
				var item = data;
				// Lets user change item
				if (item) {
					callback.preprocess({ item: item, collection: [] });
					data = item;
				}
			}

			return data;
		} else {
			return data;
		}
	}
	get(path) {
		var options = this._options;

		const fetch = process.browser ? window.fetch : require('node-fetch').default;

		var base;

		if (process.env.NODE_ENV === 'development') {
			if (options.preview && this._source !== undefined) {
				base = options.preview;
			} else {
				base = options.production;
			}
		} else {
			base = options.production;
		}

		return fetch(`${base}${path}`).then((res) => res.text()).then((json) => {
			try {
				var result = this._process(json, options);

				return result;
			} catch (err) {
				return json;
			}
		});
	}
	preprocess(func) {
		Object.assign(this._options, { preprocess: func });
	}
}

export default Client;
