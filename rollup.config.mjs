import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

const packageBuildConfig = defineConfig({
  input: './src/index.ts',
  output: [{ file: './dist/index.js', format: 'commonjs' }],
  plugins: [
    json(),
    resolve({ preferBuiltins: true }),
    commonjs({ exclude: 'node_modules' }),
    typescript({
      module: 'ESNext',
      tsconfig: './tsconfig.json',
      exclude: ['node_modules']
    })
  ],
  external: [/node_modules/]
});

const dtsBuildConfig = defineConfig({
  input: './src/index.ts',
  output: {
    file: './dist/index.d.ts'
  },
  plugins: [json(),dts()]
});

export default defineConfig([packageBuildConfig, dtsBuildConfig]);
