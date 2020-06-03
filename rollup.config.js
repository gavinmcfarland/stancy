import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
// import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'cjs',
		name: 'bundle'
	},
	plugins: [
		eslint(),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true
		}),
		commonjs(),
		uglify()
	]
};
