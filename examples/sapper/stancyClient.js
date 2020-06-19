import stancy from 'stancy';
import marked from 'marked';

const client = stancy('content/').client('https://vercel-restlike-api.vercel.app/api/');

client.preprocess('content', (data) => {
	return marked(data);
});

export default client;
