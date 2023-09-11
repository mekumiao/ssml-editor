<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, toRaw } from 'vue'
import { type IDomEditor, createEditor } from '@wangeditor/editor'
import { EMITTER_EVENT, WANGEDITOR_EVENT } from '@/constant'
import { getConfig } from '@/config'
import { useEditorStore } from '@/stores'
import { emitter } from '@/event-bus'
import Core from '@/core'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()
const { setEditor } = useEditorStore()
const ssmlEditorConfig = getConfig()

const boxRef = ref(null)
const editorRef = shallowRef<IDomEditor>()

onMounted(() => {
  Core.install()
  initEditor()
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
        emit('created', editor)
        emitter.emit(EMITTER_EVENT.EDITOR_CREATED, editor)
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
