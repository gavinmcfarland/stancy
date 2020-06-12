// import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
// import builtins from 'builtin-modules';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'cjs'
		// exports: 'named'
	},
	external: Object.keys(pkg.dependencies).concat(
		require('module').builtinModules || Object.keys(process.binding('natives'))
	),
	plugins: [
		resolve(),
		commonjs(),
		json(),
		// babel({
		// 	babelHelpers: 'runtime',
		// 	skipPreflightCheck: true
		// }),
		terser()
	]
};
