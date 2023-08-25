<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { type IDomEditor, type IEditorConfig, createEditor } from '@wangeditor/editor'
import { readChildren, saveChildren } from '@/stores'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()
const props = defineProps<{ editorConfig: IEditorConfig }>()

const boxRef = ref(null)

onMounted(() => {
  initEditor()
})

const initEditor = () => {
  if (!boxRef.value) return
  const children = readChildren()
  createEditor({
    selector: boxRef.value! as Element,
    mode: 'simple',
    content: children ?? [],
    config: {
      ...toRaw(props.editorConfig),
      onCreated(editor) {
        emit('created', editor)
        editor.focus(true)
        const config = editor.getConfig()
        config.hoverbarKeys = undefined
      },
      onChange(editor) {
        emit('change', editor)
        saveChildren(editor.children)
      }
    }
  })
}
</script>

<template>
  <div ref="boxRef" class="edit-core" style="height: 70vh; overflow-y: hidden"></div>
</template>

<style lang="scss" scoped></style>
