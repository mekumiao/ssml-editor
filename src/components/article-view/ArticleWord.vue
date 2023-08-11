<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import { type IDomEditor, type IEditorConfig } from '@wangeditor/editor'

const mode = ref('default')
const editorRef = shallowRef<IDomEditor>()

const editorConfig = { placeholder: '请输入内容...' } as IEditorConfig

const valueHtml = ref('')

onMounted(() => {
  // setTimeout(() => {
  //   valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500)
})

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
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-word {
  .article-editor {
    margin: 0 auto;
    width: 800px;
  }
}
</style>
