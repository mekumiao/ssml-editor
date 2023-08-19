<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import { type IDomEditor, type IEditorConfig } from '@wangeditor/editor'

const emit = defineEmits<{ onCreated: [editor: IDomEditor]; onChange: [editor: IDomEditor] }>()
const props = defineProps<{ maxLength: number }>()

const mode = ref('simple')
const editorRef = shallowRef<IDomEditor>()
const children = ref()

const valueHtml = ref(`地球在极其遥远的未来可能面临一些威胁，但目前不太可能突然消失。
The Earth may face some threats in the extremely distant future, but it is currently unlikely to suddenly disappear.
`)
const editorConfig = { maxLength: props.maxLength, placeholder: '请输入内容...' } as IEditorConfig

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
  const config = editor.getConfig()
  config.hoverbarKeys = undefined
  emit('onCreated', editor)
}

const handleChange = (editor: IDomEditor) => {
  children.value = editor.children
  emit('onChange', editor)
}
</script>

<template>
  <div class="edit-core">
    <div class="editor">
      <Editor
        style="height: 600px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-core {
  display: flex;

  .editor {
    margin: 0 auto;
    width: 800px;
  }
}

.model-window {
  position: fixed;
  z-index: 9999;
  bottom: 10px;
  right: 50px;
  background-color: white;

  .ssml {
    padding: 10px;
    width: 300px;
    height: 300px;
    overflow: auto;
  }

  .json {
    padding: 10px;
    width: 300px;
    height: 300px;
    overflow: auto;
  }
}
</style>
