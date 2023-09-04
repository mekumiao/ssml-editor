<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
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
  if (fn.value && !fn.value.isDisabled()) {
    fn.value.exec({ ...item })
  }
  hide()
}
</script>

<template>
  <ElPopover v-model:visible="visible" trigger="contextmenu" :hideAfter="0">
    <template #reference>
      <BarButton text="停顿调节" icon="rhythm" @click="handleClick"></BarButton>
    </template>
    <div class="d-flex flex-column">
      <div
        v-for="(item, index) in options"
        :key="index"
        class="clickable w-100 fs-6 rounded-1 px-3 py-2"
        @click="handleItemClick(item)"
        @mousedown.stop.prevent
      >
        {{ item.label }}
      </div>
    </div>
  </ElPopover>
</template>

<style lang="scss" scoped></style>
