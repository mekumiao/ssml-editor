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
    :hideAfter="hideAfter"
    :width="width"
    :visible="visible"
    :trigger="trigger"
    @update:visible="(value) => $emit('update:visible', value)"
  >
    <template v-slot:reference>
      <slot name="reference"></slot>
    </template>
    <slot></slot>
  </ElPopover>
</template>

<style lang="scss">
::v-deep .el-popover {
  padding: 1px !important;
}
</style>
