const marked = require('marked');
const stancy = require('../dist');

var client = stancy('content/').client();

client.preprocess('content', (data) => {
	return marked(data);
});

client.get('home').then((res) => console.log(res));

// client.get('users/').then((res) => console.log(res));
