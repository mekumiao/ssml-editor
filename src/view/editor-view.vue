<script setup lang="ts">
import EditorTitle from './editor-title.vue'
import EditorCore from './editor-core.vue'
import BarView from './bar-view.vue'
import { type IDomEditor } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()

const handleCreated = (editor: IDomEditor) => {
  emit('created', editor)
}

const handleChange = (editor: IDomEditor) => {
  emit('change', editor)
}

function handleClick(ev: MouseEvent) {
  emitter.emit(EMITTER_EVENT.VIEW_CLICK, ev)
}

function handleKeyDown(ev: KeyboardEvent) {
  emitter.emit(EMITTER_EVENT.VIEW_KEYDOWN, ev)
}
</script>

<template>
  <div class="editor-view" @click="handleClick" @keydown="handleKeyDown">
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
