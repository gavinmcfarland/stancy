// import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'dist/index.js',
			format: 'cjs'
		},
		watch: true,
		plugins: [
			commonjs(),
			json(),
			// babel({
			// 	babelHelpers: 'runtime',
			// 	skipPreflightCheck: true
			// }),
			terser()
		]
	},
	{
		input: 'src/clientEntry.js',
		output: {
			file: 'dist/client/index.js',
			format: 'cjs'
		},
		plugins: [ commonjs(), json(), terser() ]
	}
];
