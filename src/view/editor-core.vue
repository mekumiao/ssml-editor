<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { type IDomEditor, type IEditorConfig, createEditor } from '@wangeditor/editor'

const emit = defineEmits<{ created: [editor: IDomEditor]; change: [editor: IDomEditor] }>()
const props = defineProps<{ editorConfig: IEditorConfig; defaultHtml: string }>()

const boxRef = ref(null)

onMounted(() => {
  initEditor()
})

const initEditor = () => {
  if (!boxRef.value) return

  createEditor({
    selector: boxRef.value! as Element,
    mode: 'simple',
    html: toRaw(props.defaultHtml),
    config: {
      ...toRaw(props.editorConfig),
      onCreated(editor) {
        const config = editor.getConfig()
        config.hoverbarKeys = undefined
        editor.focus(true)
        emit('created', editor)
      },
      onChange(editor) {
        emit('change', editor)
      }
    }
  })
}
</script>

<template>
  <div ref="boxRef" class="edit-core" style="height: 600px; overflow-y: hidden"></div>
</template>

<style lang="scss" scoped></style>
