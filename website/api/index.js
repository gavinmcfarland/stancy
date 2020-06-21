var stancy = require('stancy');

var app = stancy(process.cwd() + '/content/').server(3000, '/api/');

export default app;
