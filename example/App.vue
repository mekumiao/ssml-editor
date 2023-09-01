<script setup lang="ts">
import { EditorView } from '@/view'
import type { IDomEditor } from '@wangeditor/editor'

const html = ``

function handleCreate(editor: IDomEditor) {
  // 这里公开editor是为了方便测试
  window.editor = editor
  editor.setHtml(html)
  // 异步设置焦点(editor渲染需要时间)
  setTimeout(() => {
    editor.focus(true)
  }, 500)
}
</script>

<template>
  <EditorView @created="handleCreate"></EditorView>
</template>

<style scoped></style>
