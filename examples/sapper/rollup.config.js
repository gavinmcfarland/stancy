import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import json from '@rollup/plugin-json';
import builtins from 'builtin-modules';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		// external: ['fs', 'path', 'assert'], // To ignore warning about external dependencies (annoying)
		plugins: [
			json(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve({
				browser: true,
				dedupe: [ 'svelte' ],
				exclude: [ 'node_modules/**' ]
			}),
			commonjs(),

			legacy &&
				babel({
					extensions: [ '.js', '.mjs', '.html', '.svelte' ],
					babelHelpers: 'runtime',
					exclude: [ 'node_modules/@babel/**' ],
					presets: [
						[
							'@babel/preset-env',
							{
								targets: '> 0.25%, not dead'
							}
						]
					],
					plugins: [
						'@babel/plugin-syntax-dynamic-import',
						[
							'@babel/plugin-transform-runtime',
							{
								useESModules: true
							}
						]
					]
				}),

			!dev &&
				terser({
					module: true
				})
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		preserveEntrySignatures: false,
		onwarn
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		external: [ ...builtins, 'express', 'chokidar', 'cors', 'smarkt', 'yaml', 'json5' ],
		plugins: [
			json(),
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev
			}),
			resolve({
				dedupe: [ 'svelte' ]
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		preserveEntrySignatures: 'strict',
		onwarn
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		preserveEntrySignatures: false,
		onwarn
	}
};
