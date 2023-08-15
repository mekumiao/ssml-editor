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

<style>
#app {
  margin: 0 auto;
  font-weight: normal;
}
</style>
