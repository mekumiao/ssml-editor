<script setup lang="ts">
import EditTitle from './EditTitle.vue'
import EditCore from './EditCore.vue'
import EditBarWrapper from './EditBarWrapper.vue'
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
    <EditTitle
      :bgm="bgm"
      :character-total="characterTotal"
      :character-max="characterMax"
    ></EditTitle>
    <div class="edit-box">
      <EditBarWrapper></EditBarWrapper>
      <div class="h h-1"></div>
      <EditCore
        @on-change="handleChange"
        :max-length="characterMax"
        @on-created="handleCreated"
      ></EditCore>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
