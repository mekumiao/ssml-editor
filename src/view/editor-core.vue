<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, shallowRef, toRaw } from 'vue'
import { type IDomEditor, createEditor } from '@wangeditor/editor'
import { getConfig } from '@/config'
import { useEditorStore } from '@/stores'
import Core from '@/core'
import { emitter } from '@/event-bus'
import { getEmitter } from '@/core/emitter'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()
const { setEditor, saveEditorHtml } = useEditorStore()
const editorKey = inject<symbol>('editorKey')!
const ssmlEditorConfig = getConfig(editorKey)

const boxRef = ref(null)
const editorRef = shallowRef<IDomEditor>()

onMounted(() => {
  Core.install()
  initEditor()
  initAnimation()
})

onUnmounted(() => {
  editorRef.value?.destroy()
})

async function initEditor() {
  if (!boxRef.value) return
  const editor = createEditor({
    selector: boxRef.value! as Element,
    html: (await readHtml()) || undefined,
    mode: 'simple',
    config: {
      ...toRaw(ssmlEditorConfig.editorConfig),
      onCreated(editor) {
        emitter.emit('editor-created', editor)
        emit('created', editor)
        ssmlEditorConfig.editorConfig.onCreated?.(editor)
        getEmitter(editor).on('ssml-update', handleSaveEditorHtml)
        editor.focus(true)
      },
      onChange(editor) {
        emit('change', editor)
        ssmlEditorConfig.editorConfig.onChange?.(editor)
      },
    },
  })

  editorRef.value = editor
  setEditor(editor)
}

function initAnimation() {
  if (ssmlEditorConfig.animation.zoom) {
    document.querySelector('.w-e-text-container')?.classList.add('allow-zoom')
  }
  if (ssmlEditorConfig.animation.grayscale) {
    document.querySelector('.w-e-text-container')?.classList.add('allow-grayscale')
  }
}

async function readHtml() {
  try {
    const read = ssmlEditorConfig.editorConfig.readHtml
    return (await read?.()) || null
  } catch (error) {
    emitter.emit('error', error)
    return null
  }
}

async function handleSaveEditorHtml(editor: IDomEditor) {
  try {
    await saveEditorHtml(editorKey, editor.getHtml)
  } catch (error) {
    emitter.emit('error', error)
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
