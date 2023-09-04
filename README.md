# ssml-editor

模仿[魔音工坊](https://www.moyin.com/overview/article-voice)的`ssml`编辑器

## 开始

### 一、环境

```sh
npm install -g yalc

npm install -g yarn
```

### 二、开始

1.克隆项目

```sh
git clone https://gogs.sdaxia.top/mekumiao/ssml-editor.git
```

2.编译项目

```sh
# ssml-editor
yarn install && yarn build && yalc publish

# 到此项目便成功发布到本地
```

3.创建自己的`vue3`项目

安装依赖

```sh
# 使用此命令创建项目时依次选择 vue3 > typescript
yarn vite create

# 安装ssml-editor及依赖
yalc add ssml-editor

yarn install
```

导入包

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

## 参考

1. [阿里TTS](https://ai.aliyun.com/nls/tts)
2. [wangEditor 5](https://www.wangeditor.com/)
3. [slate-table](https://github.com/lqs469/slate-table.git)
4. [wangEditor](https://github.com/wangeditor-team/wangEditor.git)
5. [SlateNode](https://docs.slatejs.org/api/nodes/node) [SlateTransforms](https://docs.slatejs.org/api/transforms) slatejs [SlateNormalizing](https://docs.slatejs.org/concepts/11-normalizing)
