<script setup lang="ts">
import EditTitle from './EditTitle.vue'
import EditCore from './EditCore.vue'
import EditBarWrapper from './EditBarWrapper.vue'
import type { IDomEditor } from '@wangeditor/editor'
import { ref } from 'vue'

const characterMax = ref(5000)
const characterTotal = ref(0)

const handleChange = (editor: IDomEditor) => {
  characterTotal.value = editor.getText().length
}
</script>

<template>
  <div class="edit-view">
    <EditTitle :character-total="characterTotal" :character-max="characterMax"></EditTitle>
    <div class="edit-box">
      <EditBarWrapper></EditBarWrapper>
      <div class="h h-1"></div>
      <EditCore @on-change="handleChange" :max-length="characterMax"></EditCore>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
