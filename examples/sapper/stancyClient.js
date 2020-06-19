import stancy from 'stancy';
import marked from 'marked';

const client = stancy('content/').client('https://now-restlike-api.now.sh/api/');

client.preprocess('content', (data) => {
	return marked(data);
});

export default client;
