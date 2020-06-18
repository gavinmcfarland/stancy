// import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import builtins from 'builtin-modules';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'umd',
		name: 'stancy'
		// exports: 'named'
		// globals: builtins
	},

	// external: Object.keys(pkg.dependencies).concat(
	// 	require('module').builtinModules || Object.keys(process.binding('natives'))
	// ),
	plugins: [
		// resolve({
		// 	preferBuiltins: true
		// }),

		commonjs(),
		json(),
		// babel({
		// 	babelHelpers: 'runtime',
		// 	skipPreflightCheck: true
		// }),
		terser()
	]
};
