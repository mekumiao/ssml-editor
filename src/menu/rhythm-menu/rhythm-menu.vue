<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton, BarPopover } from '@/components'
import { RhythmFn } from './rhythm-fn'
import type { LabelValue } from '@/model'
import { options } from './data'

const fn = shallowRef<RhythmFn>()
const visible = ref(false)

function show() {
  if (visible.value) return
  visible.value = true
}

function hide() {
  if (!visible.value) return
  visible.value = false
}

function handleClick(editor: IDomEditor) {
  fn.value ??= new RhythmFn(editor)
  if (fn.value.isDisabled()) return
  show()
}

function handleItemClick(item: LabelValue) {
  fn.value?.exec({ ...item })
  hide()
}
</script>

<template>
  <BarPopover v-model:visible="visible">
    <template #reference>
      <BarButton icon="rhythm" @click="handleClick">停顿调节</BarButton>
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
