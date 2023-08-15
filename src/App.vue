<script setup lang="ts">
import type { IDomEditor } from '@wangeditor/editor'
import { EditView } from './index'

const handleCreated = (editor: IDomEditor) => {
  window.editor = editor
}
</script>

<template>
  <EditView @on-created="handleCreated"></EditView>
</template>

<style scoped></style>
