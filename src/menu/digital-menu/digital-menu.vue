<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton, BarPopover } from '@/components'
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
  fn.value?.exec({ ...item })
  toggle()
}
</script>

<template>
  <BarPopover v-model:visible="visible">
    <template #reference>
      <BarButton icon="digital" @click="handleClick">数字符号</BarButton>
    </template>
    <div class="d-flex flex-column">
      <div
        v-for="(item, index) in options"
        :key="index"
        class="clickable w-100 fs-6 rounded-1 px-3 py-2"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </BarPopover>
</template>

<style lang="scss" scoped></style>
