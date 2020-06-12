import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import builtins from 'builtin-modules';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'cjs'
		// exports: 'named'
	},
	external: [ ...builtins ],
	plugins: [
		resolve(),
		// nodePolyfills(),

		commonjs(),
		json(),

		// babel({
		// 	babelHelpers: 'runtime',
		// 	skipPreflightCheck: true
		// }),

		terser()
	]
};
