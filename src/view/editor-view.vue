<script setup lang="ts">
import EditorTitle from './editor-title.vue'
import EditorCore from './editor-core.vue'
import BarView from './bar-view.vue'
import type { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { ref, shallowRef, provide, onUnmounted } from 'vue'
import { WANGEDITOR_EVENT } from '..'

const emit = defineEmits<{ onCreated: [editor: IDomEditor]; onChange: [editor: IDomEditor] }>()

const characterTotal = ref(0)
const editorRef = shallowRef<IDomEditor>()
const bgm = ref<LabelValue | null>(null)

provide('editor', editorRef)

const defaultHtml = `地球在极其遥远的未来可能面临一些威胁，但目前不太可能突然消失。
The Earth may face some threats in the extremely distant future, but it is currently unlikely to suddenly disappear.
`
const editorConfig = { maxLength: 5000, placeholder: '请输入内容...' } as IEditorConfig

onUnmounted(() => {
  editorRef.value?.destroy()
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
  emit('onCreated', editor)

  editor.on(WANGEDITOR_EVENT.UPDATE_BGM, (value: LabelValue) => {
    bgm.value = value
  })

  editor.on(WANGEDITOR_EVENT.REMOVE_BGM, () => {
    bgm.value = null
  })
}

const handleChange = (editor: IDomEditor) => {
  characterTotal.value = editor.getText().length
  emit('onChange', editor)
}
</script>

<template>
  <div class="edit-view">
    <EditorTitle
      :bgm="bgm"
      :character-total="characterTotal"
      :character-max="editorConfig.maxLength || 0"
    ></EditorTitle>
    <div class="edit-box">
      <BarView></BarView>
      <div class="h h-1"></div>
      <div class="editor">
        <EditorCore
          :editor-config="editorConfig"
          :default-html="defaultHtml"
          @change="handleChange"
          @created="handleCreated"
        ></EditorCore>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor {
  margin: 0 auto;
  width: 800px;
}
</style>
