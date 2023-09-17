<script setup lang="ts">
import EditorTitle from './editor-title.vue'
import EditorCore from './editor-core.vue'
import EditorBar from './editor-bar.vue'
import { type IDomEditor } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import { ref, provide } from 'vue'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()

const boxRef = ref<HTMLDivElement>()

provide('box-editor-view', boxRef)

function handleCreated(editor: IDomEditor) {
  emit('created', editor)
}

function handleChange(editor: IDomEditor) {
  emit('change', editor)
}

function handleClick(ev: MouseEvent) {
  emitter.emit('view-click', ev)
}

function handleKeyDown(ev: KeyboardEvent) {
  emitter.emit('view-keydown', ev)
}
</script>

<template>
  <div
    ref="boxRef"
    class="ssml-editor-root editor-view"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot><EditorTitle></EditorTitle></slot>
    <div class="editor-box">
      <EditorBar></EditorBar>
      <div class="editor-core-container shadow pt-1">
        <EditorCore @change="handleChange" @created="handleCreated"></EditorCore>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-view {
  background-color: var(--tool-bg-color);

  .editor-box {
    background-color: var(--tool-bg-grey-color);

    .editor-core-container {
      margin: 0 auto;
      width: 60vw;
    }
  }
}
</style>
