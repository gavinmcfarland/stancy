class Client {
	constructor(options, local) {
		this._options = options;
		if (local) {
			Object.assign(this._options, { preview: local });
		}
	}
	_process(data, callback) {
		data = JSON.parse(data);
		if (callback.preprocess) {
			var collection = data;
			if (Array.isArray(collection)) {
				collection.map((item) => {
					if (item) {
						callback.preprocess({ item: item });
					}
				});
				callback.preprocess({ item: {}, collection: collection });
				data = collection;
			} else {
				var item = data;
				if (item) {
					callback.preprocess({ item: item });
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

		var base = options.preview || 'http://localhost:3000/api/';

		if (process.env.NODE_ENV === 'development') {
			if (options.preview) {
				base = options.preview;
			}
			base = options.production;
		} else {
			base = options.production;
		}

		return fetch(`${base}${path}`).then((r) => r.text()).then((json) => {
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
