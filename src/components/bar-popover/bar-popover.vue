<script setup lang="ts">
import { ElPopover } from 'element-plus'
defineEmits<{ 'update:visible': [value: boolean] }>()
defineProps<{
  visible?: boolean
  trigger: 'hover' | 'focus' | 'click' | 'contextmenu'
  hideAfter?: number
  width?: number
}>()
</script>

<template>
  <ElPopover
    popperStyle="--el-popover-padding: 0px"
    :hideAfter="hideAfter"
    :width="width"
    :visible="visible"
    :trigger="trigger"
    @update:visible="(value) => $emit('update:visible', value)"
  >
    <template v-slot:reference>
      <slot name="reference"></slot>
    </template>
    <div class="p-2" @mousedown.stop.prevent>
      <slot></slot>
    </div>
  </ElPopover>
</template>

<style lang="scss" scoped></style>
