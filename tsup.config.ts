import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/core/index.ts', 'src/babel/index.ts'],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm'],
  esbuildOptions: (opts) => {
    opts.jsx = 'preserve'
  },
  outExtension(ctx) {
    return {
      js: `.jsx`
    }
  },
})
