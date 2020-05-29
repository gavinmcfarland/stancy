const stancy = require('../dist');

stancy('content/').serve(3000, '/api/');

// console.log(stancy('content/').database());

// async function grab() {
// 	return await stancy().get('http://localhost:3000', 'pages/about', null);
// }

// grab().then((content) => {
// 	console.log(content);
// });
