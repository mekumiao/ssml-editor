<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, toRaw } from 'vue'
import { type IDomEditor, createEditor } from '@wangeditor/editor'
import { EMITTER_EVENT, WANGEDITOR_EVENT } from '@/constant'
import { injectConfig } from '@/config'
import { useEditorStore } from '@/stores'
import { emitter } from '@/event-bus'
import Core from '@/core'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()
const { setEditor } = useEditorStore()
const globalEditConfig = injectConfig()

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
      ...toRaw(globalEditConfig.editorConfig),
      onCreated(editor) {
        emit('created', editor)
        emitter.emit(EMITTER_EVENT.EDITOR_CREATED, editor)
        globalEditConfig.editorConfig.onCreated?.(editor)
      },
      onChange(editor) {
        emit('change', editor)
        globalEditConfig.editorConfig.onChange?.(editor)
      },
    },
  })

  editorRef.value = editor
  setEditor(editor)
  editor.on(WANGEDITOR_EVENT.ERROR, globalEditConfig.handleError)
}
</script>

<template>
  <div ref="boxRef" class="edit-core" style="height: 70vh; overflow-y: hidden"></div>
</template>

<style lang="scss" scoped></style>
