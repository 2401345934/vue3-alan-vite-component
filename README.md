# [vue3-alan-vite-component](https://www.npmjs.com/package/vue3-alan-vite-component)

## 组件下载

```js
npm i vue3-alan-vite-component
```

## 全局使用方法

在vue3项目中全局引用的方式

``` ts
//main.ts or main.js
import { createApp } from 'vue';
import App from './App.vue';
import Vue3StarrySky from 'vue3-starry-sky';
import 'vue3-starry-sky/lib/style.css';

const app = createApp(App);

app.use(Vue3StarrySky);
app.mount('#app');
```

如果使用ts+vite的方式，需要在env.d.ts中加入最后一句声明，否则ts会检测报错。

``` ts
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue3-starry-sky';
```

组件内使用

``` html
<script setup></script>

<template>
 <starry-sky :stars-count="1000" :distance="1000" />
</template>

<style></style>
```

## 局部引用方法

示例：

``` html
<script setup>
import { StarrySky } from '../packages/index';
</script>

<template>
 <starry-sky :stars-count="1000" :distance="1000" />
</template>

<style></style>
```
