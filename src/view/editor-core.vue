<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRaw } from 'vue'
import { type IDomEditor, createEditor } from '@wangeditor/editor'
import { WANGEDITOR_EVENT } from '@/constant'
import { useEditorStore } from '@/stores'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()
const { editor, setEditor, globalEditConfig } = useEditorStore()

const boxRef = ref(null)

onMounted(() => {
  initEditor()
})

onUnmounted(() => {
  editor?.destroy()
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
        editor.focus(true)
      },
      onChange(editor) {
        emit('change', editor)
      },
    },
  })

  setEditor(editor)
  window.editor = editor

  const config = editor.getConfig()
  config.hoverbarKeys = undefined

  editor.on(WANGEDITOR_EVENT.ERROR, globalEditConfig.handleError)

  // try {
  //   const children = readChildren()
  //   if (children && children.length > 0) {
  //     // 暂时不加children可用性检查
  //     editor.children = children
  //     editor.updateView()
  //   }
  // } catch (error) {
  //   cleanChildren()
  //   editor.children = [{ type: 'paragraph', children: [{ text: '' }] }] as any
  //   editor.updateView()
  //   console.error('An error occurred:', error)
  // }
}
</script>

<template>
  <div ref="boxRef" class="edit-core" style="height: 70vh; overflow-y: hidden"></div>
</template>

<style lang="scss" scoped></style>
