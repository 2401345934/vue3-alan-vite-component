import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
const { resolve } = require('path');

export default defineConfig({
	plugins: [vue(),
    VueSetupExtend()
  ],
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  // 构建选项
	build: {
    // 指定输出路径
		outDir: 'lib',
    // 构建为库。entry 是必须的因为库不能使用 HTML 作为入口。name 则是暴露的全局变量，在 formats 包含 'umd' 或 'iife' 时是必须的。默认 formats 是 ['es', 'umd'] 。fileName 是输出的包文件名，默认 fileName 是 package.json 的 name 选项，同时，它还可以被定义为参数为 format 的函数。
		lib: {
			entry:  resolve(__dirname, 'packages/index.js'),
			name: 'Vue3SAlanVite',
			fileName: 'vue3-alan-vite-component',
		},
    // 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。查看 Rollup 选项文档 获取更多细节。
    // https://rollupjs.org/guide/en/#big-list-of-options
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
});
