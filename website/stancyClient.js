import stancy from 'stancy';
import marked from 'marked';
import hljs from 'highlight.js';

const client = stancy('content/').client('https://stancy.vercel.app/api/');

marked.setOptions({
	highlight: function (code, language) {
		const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
		return hljs.highlight(validLanguage, code).value;
	},
});

client.preprocess('content', (data) => {
	return marked(data);
});

export default client;
