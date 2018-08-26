import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'


export default {
  input: 'src/index.js',
  output: {
    file: `dist/d3-vue.js`,
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    vue({
      compileTemplate: true,
      css: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify({}, minify))
  ],
  external: ['vue', 'd3', 'topojson']
}