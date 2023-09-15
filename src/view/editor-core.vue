<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, toRaw } from 'vue'
import { type IDomEditor, createEditor } from '@wangeditor/editor'
import { WANGEDITOR_EVENT } from '@/constant'
import { getConfig } from '@/config'
import { useEditorStore } from '@/stores'
import Core from '@/core'
import { emitter } from '@/event-bus'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()
const { setEditor } = useEditorStore()
const ssmlEditorConfig = getConfig()

const boxRef = ref(null)
const editorRef = shallowRef<IDomEditor>()

onMounted(() => {
  Core.install()
  initEditor()
  initEffects()
})

onUnmounted(() => {
  editorRef.value?.destroy()
})

function initEditor() {
  if (!boxRef.value) return
  const editor = createEditor({
    selector: boxRef.value! as Element,
    mode: 'simple',
    config: {
      ...toRaw(ssmlEditorConfig.editorConfig),
      onCreated(editor) {
        emitter.emit('editor-created', editor)
        emit('created', editor)
        ssmlEditorConfig.editorConfig.onCreated?.(editor)
      },
      onChange(editor) {
        emit('change', editor)
        ssmlEditorConfig.editorConfig.onChange?.(editor)
      },
    },
  })

  editorRef.value = editor
  setEditor(editor)
  editor.on(WANGEDITOR_EVENT.ERROR, ssmlEditorConfig.handleError)
}

function initEffects() {
  if (ssmlEditorConfig.effects.zoom) {
    document.querySelector('.w-e-text-container')?.classList.add('allow-zoom')
  }
  if (ssmlEditorConfig.effects.grayscale) {
    document.querySelector('.w-e-text-container')?.classList.add('allow-grayscale')
  }
}
</script>

<template>
  <div ref="boxRef" class="editor-core scrollbar" style="height: 70vh; overflow-y: hidden"></div>
</template>

<style lang="scss" scoped>
@import '@/assets/scrollbar.scss';

:deep() {
  .w-e-scroll {
    @include scrollBar();
  }
}
</style>
