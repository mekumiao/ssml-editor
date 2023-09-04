<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { BarButton, BarInput } from '@/components'
import { ElPopover } from 'element-plus'
import { AliasFn } from './alias-fn'
import type { IDomEditor } from '@wangeditor/editor'

const fn = shallowRef<AliasFn>()
const inputRef = ref()
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
  fn.value ??= new AliasFn(editor)
  if (fn.value.isDisabled()) return
  show()
  inputRef.value?.focus()
}

function handleSubmit(text: string | null) {
  hide()
  if (text) {
    fn.value?.exec({ value: text, label: text })
  }
}
</script>

<template>
  <ElPopover
    v-model:visible="visible"
    trigger="contextmenu"
    placement="right-end"
    :hideAfter="0"
    :width="200"
  >
    <template #reference>
      <BarButton text="别名" icon="alias" @click="handleClick"></BarButton>
    </template>
    <BarInput ref="inputRef" @submit="handleSubmit"></BarInput>
  </ElPopover>
</template>

<style lang="scss" scoped></style>
