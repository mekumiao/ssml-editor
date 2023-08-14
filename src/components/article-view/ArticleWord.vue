<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'

import { onBeforeUnmount, ref, shallowRef, computed } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import { type IDomEditor, type IEditorConfig } from '@wangeditor/editor'

const mode = ref('simple')
const editorRef = shallowRef<IDomEditor>()
const children = ref()

const code = computed<string>(() => JSON.stringify(children.value, null, 4))

const valueHtml = ref('')
const editorConfig = { placeholder: '请输入内容...' } as IEditorConfig

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
  window.editor = editor
  const config = editor.getConfig()
  config.hoverbarKeys = undefined
}

const handleChange = (editor: IDomEditor) => {
  children.value = editor.children
}
</script>

<template>
  <div class="article-word">
    <div class="article-editor">
      <Editor
        style="height: 600px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
  </div>

  <div class="model-window">
    <pre class="ssml">{{ valueHtml }}</pre>
    <pre class="json">{{ code }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.article-word {
  display: flex;

  .article-editor {
    margin: 0 auto;
    width: 800px;
  }
}

.model-window {
  position: fixed;
  z-index: 9999;
  bottom: 10px;
  right: 50px;
  background-color: white;

  .ssml {
    padding: 10px;
    width: 300px;
    height: 300px;
    overflow: auto;
  }

  .json {
    padding: 10px;
    width: 300px;
    height: 300px;
    overflow: auto;
  }
}
</style>
