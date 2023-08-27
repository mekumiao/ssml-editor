# ssml-editor

模仿[魔音工坊](https://www.moyin.com/overview/article-voice)的`ssml`编辑器

## 开始

### 一、环境

```sh
npm install -g yalc

npm install -g pnpm
```

### 二、开始

1.克隆项目

```sh
git clone https://gogs.sdaxia.top/mekumiao/ssml-editor.git

git clone https://gogs.sdaxia.top/mekumiao/wangEditor-for-vue3.git
```

2.编译项目

```sh
# wangEditor-for-vue3
yarn && yarn build && yalc publish

# ssml-editor
yalc update && pnpm i && pnpm build && yalc publish

# 到此项目便成功发布到本地
```

3.创建自己的`vue3`项目

安装依赖

```sh
# 使用此命令创建项目时依次选择 vue3 > typescript
pnpm vite create

# 安装ssml-editor及依赖
yalc add ssml-editor @wangeditor/editor-for-vue

pnpm i @wangeditor/editor element-plus xml-formatter
```

导入包

```ts
//src/main.ts

import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
import 'ssml-editor/dist/style.css'

import { Boot } from '@wangeditor/editor'
import { SSMLModule, EditorMenuPlugin } from 'ssml-editor'

Boot.registerModule(SSMLModule)

const app = createApp(App)

app.use(EditorMenuPlugin)

app.mount('#app')
```

## 参考

1. [阿里TTS](https://ai.aliyun.com/nls/tts)
2. [wangEditor 5](https://www.wangeditor.com/)
3. [slate-table](https://github.com/lqs469/slate-table.git)
4. [wangEditor](https://github.com/wangeditor-team/wangEditor.git)
5. [node](https://docs.slatejs.org/api/nodes/node) [transforms](https://docs.slatejs.org/api/transforms) slatejs [normalizing](https://docs.slatejs.org/concepts/11-normalizing)

## 常见操作

```ts
// 从指定位置查找
const { selection } = editor
const [node] = SlateEditor.nodes(editor, {
  at: location,
  match: (n) => {
    const type = DomEditor.getNodeType(n)
    return type === 'table'
  },
})

// 根据type查找node
const cell = DomEditor.getSelectedNodeByType(newEditor, 'table-cell')

// 根据node查找path
const path = DomEditor.findPath(newEditor, cell)

// 获取path位置的起点
const start = SlateEditor.start(editor, path)
// 获取path位置的终点
const end = SlateEditor.end(editor, path)

// 设置焦点
editor.select(end)
// 或者选中多个字符
editor.select({ anchor: start, focus: end })

// 渲染方法
function renderContinuous(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  return createWrap('continuous', '连读', children)
}
```

## 其他代码

```ts
const word = SlateEditor.string(editor, range)
const nodeEntity = SlateEditor.node(editor, range)
const path = DomEditor.findPath(editor, elem)
const key = DomEditor.findKey(editor, elem)
const nodeEntity2 = SlateEditor.node(editor, path)
// const bb = DomEditor.findDocumentOrShadowRoot(editor)
debugger

// import { createVNode, render } from 'vue'
// import { ElButton } from 'element-plus'

// const node = document.createElement('div')
// const vnode = createVNode(ElButton, { text: 'xxxxx' })
// render(vnode, node)
// console.log(node)
// console.log(vnode)

// Transforms.splitNodes(editor, { at: prePath })

// Transforms.wrapNodes(editor, word, { at: prePath })
// Transforms.insertNodes(editor, word, { at: prePath })
// editor.move(1)

// const [, path] = Editor.node(editor, selection)
// const newPath = SlatePath.next(SlatePath.next(path))

// console.log(Editor.node(editor, newPath))

// editor.select(path)

// SlatePath.parent(path)

// const block = SlateEditor.above(editor, { match: (n) => SlateEditor.isBlock(editor, n) })
// if (block == null) return
// console.log(block)

// const blockStart = SlateEditor.start(editor, block[1])
// const blockEnd = SlateEditor.end(editor, block[1])
// const range: SlateRange = { anchor: blockStart, focus: blockEnd }
// const [, prePath] = Editor.node(editor, selection)

// const entitys = Editor.nodes(editor, {
//   // at: selection!,
//   match: (n) => {
//     console.log(DomEditor.getNodeType(n))
//     return true
//   },
//   universal: false
// })

// if (entitys) {
//   console.log('entitys', entitys)

//   for (const iterator of entitys) {
//     console.log(iterator)
//   }
// }

// const [textNode] = Editor.nodes(editor, {
//   match: (n) => {
//     console.log(n)
//     return SlateText.isText(n) && n.text == ''
//   },
//   universal: false,
//   mode: 'highest'
// })
// console.log(textNode)

// Transforms.select(editor,)

// Transforms.wrapNodes(editor, word, { at: selection!, mode: 'highest' })

// const [cellEntry] = Editor.nodes(editor, {
//   match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
//   universal: true
// })
// const [cellNode, cellPath] = cellEntry

// const tableNode = DomEditor.getSelectedNodeByType(editor, 'table')
// if (tableNode == null) {
//   // 选区未处于 table cell node ，则禁用
//   return true
// }
```
