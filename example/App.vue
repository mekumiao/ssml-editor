<script setup lang="ts">
import { EditorView } from '@/view'
import type { IDomEditor } from '@wangeditor/editor'

function handleCreate(editor: IDomEditor) {
  // 这里公开editor是为了方便测试
  window.editor = editor
}
</script>

<template>
  <EditorView @created="handleCreate"></EditorView>
</template>

<style scoped></style>
