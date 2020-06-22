const marked = require('marked');
const stancy = require('../dist');

var client = stancy('content/').client('https://now-restlike-api.now.sh/api/');

client.preprocess('content', (data) => {
	return marked(data);
});

client.get('users/jerry').then((res) => console.log(res));

// client.get('users/').then((res) => console.log(res));
