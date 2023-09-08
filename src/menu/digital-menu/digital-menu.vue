<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { DigitalFn } from './digital-fn'
import { options } from './data'
import type { LabelValue } from '@/model'

const fn = shallowRef<DigitalFn>()
const visible = ref(false)

function toggle() {
  visible.value = !visible.value
}

function handleClick(editor: IDomEditor) {
  fn.value ??= new DigitalFn(editor)
  if (fn.value.isDisabled()) return
  toggle()
}

function handleItemClick(item: LabelValue) {
  if (fn.value && !fn.value.isDisabled()) {
    fn.value.exec({ ...item })
  }
  toggle()
}
</script>

<template>
  <ElPopover
    popperStyle="--el-popover-padding: 0px"
    v-model:visible="visible"
    trigger="contextmenu"
    :hideAfter="0"
  >
    <template #reference>
      <BarButton text="数字符号" icon="digital" @click="handleClick"></BarButton>
    </template>
    <div class="p-2 ssml-editor-root d-flex flex-column" @mousedown.stop.prevent>
      <div
        v-for="(item, index) in options"
        :key="index"
        class="clickable w-100 fs-6 rounded-1 px-3 py-2"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </ElPopover>
</template>

<style lang="scss" scoped></style>
