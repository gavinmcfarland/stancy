var stancy = require('stancy');

stancy(process.cwd() + '/content/').server(3000, '/api/');
