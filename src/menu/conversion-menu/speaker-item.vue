<script setup lang="ts">
import { demoAvatar } from '@/config'

defineEmits<{ click: [value: string] }>()
defineProps<{ label: string; value?: string; avatar?: string; activated?: boolean }>()
</script>

<template>
  <div class="speaker-item" @click="$emit('click', value || '')">
    <div class="speaker-head">
      <img
        :src="avatar || demoAvatar()"
        :class="{ 'border border-warning': activated }"
        class="rounded-circle"
        style="height: 40px"
      />
    </div>
    <div style="font-size: 0.5rem">{{ label }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
