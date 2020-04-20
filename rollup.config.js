import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'cjs',
		name: 'bundle'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true
		}),
		commonjs(),
		uglify()
	]
};
