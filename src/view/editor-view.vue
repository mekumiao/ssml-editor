<script setup lang="ts">
import EditorTitle from './editor-title.vue'
import EditorCore from './editor-core.vue'
import BarView from './bar-view.vue'
import { type IDomEditor } from '@wangeditor/editor'

const emit = defineEmits<{ onCreated: [editor: IDomEditor]; onChange: [editor: IDomEditor] }>()

const handleCreated = (editor: IDomEditor) => {
  emit('onCreated', editor)
}

const handleChange = (editor: IDomEditor) => {
  emit('onChange', editor)
}
</script>

<template>
  <div class="editor-view">
    <EditorTitle></EditorTitle>
    <div class="editor-box">
      <BarView></BarView>
      <div class="editor-core-container shadow pt-1">
        <EditorCore @change="handleChange" @created="handleCreated"></EditorCore>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-view {
  .editor-box {
    background-color: var(--tool-bg-color);

    .editor-core-container {
      margin: 0 auto;
      width: 60vw;
    }
  }
}
</style>
