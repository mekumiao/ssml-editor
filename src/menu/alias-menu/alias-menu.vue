<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { BarButton, BarInput, BarPopover } from '@/components'
import { AliasFn } from './alias-fn'
import type { IDomEditor } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT, WANGEDITOR_EVENT } from '@/constant'
import type { SSMLBaseElement } from '@/core/base'

const fn = shallowRef<AliasFn>()
const inputRef = ref<InstanceType<typeof BarInput>>()
const visible = ref(false)

emitter.on(EMITTER_EVENT.EDITOR_CREATED, (editor: IDomEditor) => {
  editor.on(WANGEDITOR_EVENT.SSML_REMARK_CLICK, (editor: IDomEditor, elem: SSMLBaseElement) => {
    if (elem.type === 'ssml-sub') handleClick(editor)
  })
})

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
  <BarPopover v-model:visible="visible" placement="right-end" :width="200">
    <template #reference>
      <BarButton icon="alias" @click="handleClick">别名</BarButton>
    </template>
    <BarInput ref="inputRef" @submit="handleSubmit"></BarInput>
  </BarPopover>
</template>

<style lang="scss" scoped></style>
