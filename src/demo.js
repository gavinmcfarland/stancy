const marked = require('marked');
const stancy = require('../dist');

var app = stancy('content/');

app.server();

var client = stancy('content/').client({
	production: 'https://now-restlike-api.now.sh/api/'
});

client.preprocess(({ item, collection }) => {
	if (item.content) {
		item.content = marked('## hello\n ' + item.content);
	}
	if (collection) {
		collection.push({ test: '1' });
	}
});

client.get('users/jerry').then((res) => console.log(res));

client.get('users/').then((res) => console.log(res));
