const marked = require('marked');
const stancy = require('../dist');

var app = stancy('content/');

app.server();

var client = stancy('content/').client({
	production: 'https://now-restlike-api.now.sh/api/'
});

client.preprocess((item, data) => {
	if (item.content) {
		item.content = marked('## hello\n ' + item.content);
	}
	if (data) {
		data.push({ test: '1' });
	}
});

client.get('users/jerry').then((res) => res);

client.get('users/').then((res) => res);

// const client = require('../dist').client;

// stancy('content/').serve(3000, '/api/');

// client.config({
// 	local: 'http://localhost:4000/api/',
// 	remote: 'https://now-restlike-api.now.sh/api/',
// 	process: ({ item }) => {
// 		if (item.content) item.content = marked(item.content);
// 		return item;
// 	}
// });

// async function grab() {
// 	return await client.fetch('pages');
// }

// grab().then((content) => {
// 	console.log(content);
// });
