import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/core/index.ts', 'src/babel/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm'],
  esbuildOptions: (opts) => {
    opts.jsx = 'preserve'
  },
  outExtension() {
    return {
      js: '.js',
    }
  },
})
