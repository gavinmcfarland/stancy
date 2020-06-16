const marked = require('marked');
const stancy = require('../dist');

var client = stancy('content/').client({
	production: 'https://now-restlike-api.now.sh/api/'
});

console.log('------ preprocess ------');
client.preprocess(({ item, collection }) => {
	if (item.content) {
		item.content = marked(item.content);
	}
	if (collection) {
		collection.push({ test: '1' });
	}
});

console.log('------ get data ------');

client.get('users/jerry').then((res) => console.log(res));

client.get('users/').then((res) => console.log(res));
