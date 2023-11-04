<script setup lang="ts">
import { defaultAvatar } from '@/config'
import type { StyleAvatarData } from './data'

defineEmits<{ click: [value: string] }>()
withDefaults(defineProps<{ activate?: boolean; data?: StyleAvatarData }>(), {
  activate: false,
  data: () => ({ label: '', value: '' }),
})

function getRandomColor() {
  const mainstreamColors = [
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#e74c3c',
    '#1abc9c',
    '#e67e22',
    '#d35400',
    '#c0392b',
    '#16a085',
    '#27ae60',
    '#ff1493',
  ]

  const randomIndex = Math.floor(Math.random() * mainstreamColors.length)
  return mainstreamColors[randomIndex]
}

const bgColor = getRandomColor()
</script>

<template>
  <div
    class="anchor-avatar d-flex flex-column align-items-center text-center justify-content-center position-relative"
    @click="$emit('click', data.value)"
  >
    <div
      v-if="data.emoji"
      class="rounded-circle d-flex border-info justify-content-center align-items-center"
      style="height: 30px; width: 30px"
      :style="{ 'background-color': bgColor }"
      :class="{ 'border border-2 border-warning': activate }"
    >
      {{ data.emoji }}
    </div>
    <img
      v-else
      :src="data.avatar || defaultAvatar()"
      class="rounded-circle"
      style="height: 30px; width: 30px"
      :class="{ 'border border-2 border-warning': activate }"
    />
    <div class="anchor-avatar-name text-white" style="font-size: 0.65rem">{{ data.label }}</div>
  </div>
</template>

<style lang="scss" scoped>
.anchor-avatar {
  .anchor-avatar-name {
    font-size: 12px;
  }
}
</style>
