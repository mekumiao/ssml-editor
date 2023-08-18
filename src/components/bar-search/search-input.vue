<script setup lang="ts">
import { ref } from 'vue'
import { ElInput, ElForm } from 'element-plus'

const emit = defineEmits<{ submit: [value: string] }>()

const searchInput = ref('')

function handleSubmit() {
  emit('submit', searchInput.value)
}
</script>

<template>
  <div class="search-input">
    <ElForm @submit.prevent="handleSubmit">
      <ElInput v-model="searchInput"></ElInput>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped></style>
