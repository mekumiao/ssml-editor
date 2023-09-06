# ssml-editor

[在线体验](https://ssml.sdaxia.top/)  
模仿[魔音工坊UI](https://www.moyin.com/overview/article-voice)的`SSML`编辑器  
根据[微软语音文档](https://learn.microsoft.com/zh-cn/azure/ai-services/speech-service/speech-synthesis-markup)生成SSML, 可配合大佬项目[tts-vue](https://github.com/LokerL/tts-vue.git)一起使用

## 开始

### 一、环境

```sh
# 用于发布包到本地
npm install -g yalc
# 包管理器
npm install -g yarn
```

### 二、开始

1.克隆项目

```sh
git clone https://gogs.sdaxia.top/mekumiao/ssml-editor.git
```

2.编译项目

```sh
# 安装依赖
yarn install
# 编译
yarn build
```

3.发布项目到本地

```sh
yalc publish
```

4.创建自己的`vue3`项目(已有则忽略)

```sh
# 使用此命令创建项目时依次选择 vue3 > typescript
yarn vite create
```

5.在自己的项目中安装刚才发布的`ssml-editor`

```sh
# 使用yalc安装ssml-editor
yalc add ssml-editor

yarn install
```

6.在自己的项目中导入ssml-editor包

```ts
//src/main.ts

import { createApp } from 'vue'
import App from './App.vue'

import 'ssml-editor/dist/style.css'

import SSMLEditor from 'ssml-editor'

const app = createApp(App)
app.use(SSMLEditor)
app.mount('#app')
```

7.使用

```vue
<script setup lang="ts">
import { EditorView } from 'ssml-editor'
</script>

<template>
  <EditorView></EditorView>
</template>

<style scoped></style>
```

## 参考

1. [阿里TTS](https://ai.aliyun.com/nls/tts)
2. [wangEditor 5](https://www.wangeditor.com/)
3. [slate-table](https://github.com/lqs469/slate-table.git)
4. [wangEditor](https://github.com/wangeditor-team/wangEditor.git)
5. [SlateNode](https://docs.slatejs.org/api/nodes/node) [SlateTransforms](https://docs.slatejs.org/api/transforms) slatejs [SlateNormalizing](https://docs.slatejs.org/concepts/11-normalizing)
