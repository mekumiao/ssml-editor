<script setup lang="ts">
import { ElForm, ElInput } from 'element-plus'
import { ref } from 'vue'

const emit = defineEmits<{ submit: [value: string] }>()
defineProps<{ type?: string }>()

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
  <ElForm @submit.prevent="handleSubmit">
    <ElInput :type="type" ref="inputRef" v-model="inputValue"></ElInput>
  </ElForm>
</template>

<style lang="scss" scoped></style>
