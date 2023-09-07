<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { ChangespeedFn } from './changespeed-fn'
import { rates } from './data'
import type { LabelValue } from '@/model'

const fn = shallowRef<ChangespeedFn>()
const visible = ref(false)

function show() {
  if (visible.value) return
  visible.value = true
}

function hide() {
  if (!visible.value) return
  visible.value = false
}

async function handleClick(editor: IDomEditor) {
  fn.value ??= new ChangespeedFn(editor)
  if (fn.value.isDisabled()) return
  show()
}

function handleItemClick(item: LabelValue) {
  fn.value?.exec({ ...item })
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
      <BarButton text="局部变速" icon="changespeed" @click="handleClick"></BarButton>
    </template>
    <div
      class="p-2 ssml-editor-root d-flex flex-column overflow-x-hidden overflow-y-scroll scrollbar"
      style="height: 15rem"
      @mousedown.stop.prevent
    >
      <div
        v-for="(item, index) in rates"
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
