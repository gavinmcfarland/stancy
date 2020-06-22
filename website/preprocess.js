// import fs from 'fs';
// import postcss from 'postcss';
// import atImport from 'postcss-import';
const fs = require('fs');
const postcss = require('postcss');
const postcssrc = require('postcss-load-config');
const chokidar = require('chokidar');
const path = require('path');

const ctx = { parser: true, map: 'inline' };

export default function processPostCSS(input, output) {
	var dir = path.dirname(input);
	chokidar.watch(input).on('all', (event, path) => {
		fs.readFile(input, (err, css) => {
			postcssrc(ctx).then(({ plugins, options }) => {
				postcss(plugins).process(css, { from: input, to: output }).then((result) => {
					fs.writeFile(output, result.css, () => true);
					if (result.map) {
						fs.writeFile(output + '.map', result.map, () => true);
					}
				});
			});
		});
	});
}
