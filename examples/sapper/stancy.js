import { client } from 'stancy';
import marked from 'marked';

client.config({
	preview: 'http://localhost:4000/api/',
	production: 'https://now-restlike-api.now.sh/api/',
	preprocess: ({ item }) => {
		if (item.content) item.content = marked(item.content);
		return item;
	}
});

export default client;
