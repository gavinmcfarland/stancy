const marked = require('marked');
const stancy = require('../dist');

var client = stancy('content/').client({
	production: 'https://now-restlike-api.now.sh/api/'
});

client.get('users/jerry').then((res) => res);

client.get('users/').then((res) => res);
