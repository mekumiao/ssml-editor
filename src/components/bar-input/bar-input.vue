<script setup lang="ts">
import { ElForm, ElButton, ElInput } from 'element-plus'
import { Promotion } from '@element-plus/icons-vue'
import { ref } from 'vue'

const emit = defineEmits<{ submit: [value: string] }>()

const inputValue = ref('')
const inputRef = ref()

function focus() {
  inputRef.value.focus()
}

function handleSubmit() {
  emit('submit', inputValue.value)
  inputValue.value = ''
}

defineExpose({
  focus
})
</script>

<template>
  <ElForm class="flex flex-row" @submit.prevent="handleSubmit">
    <ElInput ref="inputRef" v-model="inputValue">
      <template #append>
        <ElButton @onClick="handleSubmit" :icon="Promotion"></ElButton>
      </template>
    </ElInput>
  </ElForm>
</template>

<style lang="scss" scoped></style>
