<script setup lang="ts">
import { EditorView } from '@/view'
import type { IDomEditor } from '@wangeditor/editor'

function handleCreate(editor: IDomEditor) {
  window.editor = editor
  const html = readHtml()
  html && editor.setHtml(html)
  setTimeout(() => {
    editor.focus(true)
  }, 500)
}

function handleChange(editor: IDomEditor) {
  const html = editor.getHtml()
  saveHtml(html)
}

function saveHtml(html: string) {
  window.localStorage.setItem('editor-html', html)
}

function readHtml() {
  return window.localStorage.getItem('editor-html')
}
</script>

<template>
  <EditorView @created="handleCreate" @change="handleChange"></EditorView>
</template>

<style scoped></style>
