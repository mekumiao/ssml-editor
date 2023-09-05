<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { ReadFn } from './read-fn'
import { readList, type ReadLabelValue } from './data'

const fn = shallowRef<ReadFn>()
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
  fn.value ??= new ReadFn(editor)
  if (fn.value.isDisabled()) return
  show()
}

function handleItemClick(item: ReadLabelValue) {
  if (fn.value && !fn.value.isDisabled()) {
    fn.value.exec({ ...item })
  }
  hide()
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
      <BarButton text="重音" icon="read" @click="handleClick"></BarButton>
    </template>
    <div class="d-flex flex-column p-2" @mousedown.stop.prevent>
      <div
        v-for="(item, index) in readList"
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
