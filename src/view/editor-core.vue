<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { type IDomEditor, type IEditorConfig, createEditor } from '@wangeditor/editor'
import { readChildren, saveChildren } from '@/stores'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()
const props = defineProps<{ editorConfig: IEditorConfig; defaultHtml?: string }>()

const boxRef = ref(null)

onMounted(() => {
  initEditor()
})

const initEditor = () => {
  if (!boxRef.value) return
  const children = readChildren()
  console.log('children', children)
  createEditor({
    selector: boxRef.value! as Element,
    mode: 'simple',
    content: children ?? [],
    // html: toRaw(props.defaultHtml),
    config: {
      ...toRaw(props.editorConfig),
      onCreated(editor) {
        const config = editor.getConfig()
        config.hoverbarKeys = undefined
        editor.focus(true)
        emit('created', editor)
      },
      onChange(editor) {
        saveChildren(editor.children)
        emit('change', editor)
      }
    }
  })
}
</script>

<template>
  <div ref="boxRef" class="edit-core" style="height: 70vh; overflow-y: hidden"></div>
</template>

<style lang="scss" scoped></style>
