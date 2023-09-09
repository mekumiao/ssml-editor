<script setup lang="ts">
import { ElPopover } from 'element-plus'
import type { Placement } from '@popperjs/core'

defineEmits<{ 'update:visible': [value: boolean] }>()
defineProps<{ visible?: boolean; width?: number; placement?: Placement }>()
</script>

<template>
  <ElPopover
    popperStyle="--el-popover-padding: 0px"
    :hideAfter="0"
    :width="width"
    :visible="visible"
    :placement="placement"
    trigger="contextmenu"
    @update:visible="(value) => $emit('update:visible', value)"
  >
    <template v-slot:reference>
      <slot name="reference"></slot>
    </template>
    <div class="ssml-editor-root p-2" @mousedown.stop.prevent>
      <slot></slot>
    </div>
  </ElPopover>
</template>

<style lang="scss" scoped></style>
