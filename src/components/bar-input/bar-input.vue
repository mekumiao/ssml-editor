<script setup lang="ts">
import { ElForm, ElInput } from 'element-plus'
import { ref, nextTick } from 'vue'

const emit = defineEmits<{ submit: [value: string] }>()
defineProps<{ type?: string }>()

const inputValue = ref('')
const inputRef = ref<InstanceType<typeof ElInput>>()

function focus() {
  nextTick(() => {
    inputRef.value!.input!.focus()
  })
}

function handleSubmit() {
  emit('submit', inputValue.value)
  inputValue.value = ''
}

defineExpose({
  focus,
})
</script>

<template>
  <ElForm @submit.prevent="handleSubmit">
    <ElInput :type="type" ref="inputRef" v-model="inputValue"></ElInput>
  </ElForm>
</template>

<style lang="scss" scoped></style>
