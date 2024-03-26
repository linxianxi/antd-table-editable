import { defineConfig } from 'dumi';
import { homepage } from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const name = 'antd-table-editable';

export default defineConfig({
  themeConfig: {
    name,
    github: homepage,
  },
  base: isProd ? `/${name}/` : '/',
  publicPath: isProd ? `/${name}/` : '/',
  html2sketch: {},
  mfsu: false,
  outputPath: '.doc',
  locales: [{ id: 'zh-CN', name: '中文' }],
});
