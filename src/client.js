class Client {
	constructor(production, local, source) {
		this._source = source;
		this._options = {
			production: production
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
						if (item.content) {
							item.content = callback.preprocess[1](item.content);
						}
					});
				} else {
					if (data.content) {
						data.content = callback.preprocess[1](data.content);
					}
				}
			}

			if (callback.preprocess[0] === 'item') {
				if (Array.isArray(data)) {
					data.map((item) => {
						item = callback.preprocess[1](item);
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
	preprocess(type, callback) {
		Object.assign(this._options, { preprocess: [ type, callback ] });
	}
}

export default Client;
