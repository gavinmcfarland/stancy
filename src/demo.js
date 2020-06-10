const stancy = require('../dist');

const client = require('../dist').client;

stancy('content/').serve(3000, '/api/');

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
