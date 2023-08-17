<script setup lang="ts">
import EditTitle from './EditTitle.vue'
import EditCore from './EditCore.vue'
import EditBarWrapper from './EditBarWrapper.vue'
import type { IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef, provide } from 'vue'

const emit = defineEmits<{ onCreated: [editor: IDomEditor]; onChange: [editor: IDomEditor] }>()

const characterMax = ref(5000)
const characterTotal = ref(0)
const editorRef = shallowRef<IDomEditor>()

provide('editor', editorRef)

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
  characterTotal.value = editor.getText().length
  emit('onCreated', editor)
}

const handleChange = (editor: IDomEditor) => {
  characterTotal.value = editor.getText().length
  emit('onChange', editor)
}
</script>

<template>
  <div class="edit-view">
    <EditTitle :character-total="characterTotal" :character-max="characterMax"></EditTitle>
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
