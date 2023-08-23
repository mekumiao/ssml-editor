<script setup lang="ts">
import type { LabelValue } from '@/model'

defineEmits<{ submit: [value: LabelValue] }>()
</script>

<template>
  <div><button @click="$emit('submit', { value: '局部变音', label: '局部变音' })">局部变音</button></div>
</template>

<style lang="scss" scoped></style>
