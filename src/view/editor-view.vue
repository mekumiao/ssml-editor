<script setup lang="ts">
import EditorTitle from './editor-title.vue'
import EditorCore from './editor-core.vue'
import BarView from './bar-view.vue'
import type { IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef, provide } from 'vue'

type Options = { value: string; label: string }

const emit = defineEmits<{ onCreated: [editor: IDomEditor]; onChange: [editor: IDomEditor] }>()

const characterMax = ref(5000)
const characterTotal = ref(0)
const editorRef = shallowRef<IDomEditor>()
const bgm = ref<Options | null>(null)

provide('editor', editorRef)

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
  characterTotal.value = editor.getText().length
  emit('onCreated', editor)

  editor.on('updateBgm', (value: Options) => {
    bgm.value = value
  })

  editor.on('removeBgm', () => {
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
      :character-max="characterMax"
    ></EditorTitle>
    <div class="edit-box">
      <BarView></BarView>
      <div class="h h-1"></div>
      <EditorCore
        @on-change="handleChange"
        :max-length="characterMax"
        @on-created="handleCreated"
      ></EditorCore>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
