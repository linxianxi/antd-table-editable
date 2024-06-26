import { defineConfig } from 'father';

export default defineConfig({
  cjs: { output: 'lib' },
  esm: { output: 'es' },
  umd: { output: 'dist', name: 'antdTableEditable' },
});
