<script setup lang="ts">
import type { LabelValue } from '@/model'

defineEmits<{ 'update:modelValue': [value: string] }>()
defineProps<{ modelValue: string; dataList: LabelValue[] }>()
</script>

<template>
  <div class="select-list" style="width: 120px">
    <div class="text-center d-flex flex-column justify-content-center fs-6" style="height: 60px">
      <slot></slot>
    </div>
    <ul class="text-center w-100 border-start border-top border-bottom border-secondary-subtle">
      <li
        class="clickable"
        v-for="(item, index) in dataList"
        :class="{ activate: item.value === modelValue }"
        :key="index"
        @click="$emit('update:modelValue', item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.select-list {
  .activate {
    color: blue;
  }
}
</style>
