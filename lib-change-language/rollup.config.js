const resolve = require('@rollup/plugin-node-resolve')
const commonJS = require('@rollup/plugin-commonjs')
// const dts = require('rollup-plugin-dts')
const typescript = require('rollup-plugin-typescript2')
const pkg = require('./package.json')
const autoprefixer = require('autoprefixer')
// const { visualizer } = require('rollup-plugin-visualizer')
const nodePolyfills = require('rollup-plugin-polyfill-node')
const postcss = require('rollup-plugin-postcss')
const path = require('path')

const prodMode = process.env.NODE_ENV === 'production'

const optimizeLib = prodMode ? [require('rollup-plugin-terser').terser()] : []

module.exports = [
  {
    input: pkg.source,
    output: [
      {
        name: 'ChangeLanguage',
        file: pkg.main,
        format: 'cjs',
        sourcemap: prodMode ? false : 'inline',
        inlineDynamicImports: true,
      },
    ],
    onwarn: (warning, warn) => {
      // ignore CIRCULAR_DEPENDENCY warning for node_modules
      if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.message.includes('node_modules')) {
        return
      }
      warn(warning)
    },
    // external:['../assets/index.scss'],
    plugins: [
      // visualizer({
      //   emitFile: true,
      //   file: 'stats.html',
      //   gzipSize: true,
      // }),
      postcss({
        // Or with custom file name
        extract: path.resolve('dist/lib-change-language.css'),
        minimize: prodMode,
        plugins:[autoprefixer],
        extensions: ['.css', '.scss']
      }),
      resolve.nodeResolve({
        browser: true,
      }),
      commonJS(),
      nodePolyfills(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
      require('rollup-plugin-replace')({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      //Mode production
      ...optimizeLib,],
  },
//   {
//   input: pkg.source, plugins: [dts.default()],
//   output: {
//     file: pkg.typings, format: 'esm',
//   },
// },
]
