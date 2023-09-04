<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton, BarInput } from '@/components'
import { ElPopover } from 'element-plus'
import { MuteFn } from './mute-fn'
import { options } from './data'

const fn = shallowRef<MuteFn>()
const visible = ref(false)
const inputRef = ref<InstanceType<typeof BarInput>>()

function show() {
  if (visible.value) return
  visible.value = true
}

function hide() {
  if (!visible.value) return
  visible.value = false
}

function handleClick(editor: IDomEditor) {
  fn.value ??= new MuteFn(editor)
  if (fn.value.isDisabled()) return
  show()
  inputRef.value?.focus()
}

function handleSubmit(text: string | null) {
  hide()
  if (!text) return
  fn.value?.exec({ value: text, label: text })
}
</script>

<template>
  <ElPopover v-model:visible="visible" trigger="contextmenu" :hideAfter="0" :width="200">
    <template #reference>
      <BarButton text="插入静音" icon="mute" @click="handleClick"></BarButton>
    </template>
    <div class="d-flex flex-column">
      <div
        v-for="(item, index) in options"
        :key="index"
        class="clickable w-100 fs-6 rounded-1 px-3 py-2"
        @click="handleSubmit(item.value)"
        @mousedown.stop.prevent
      >
        {{ item.label }}
      </div>
      <BarInput type="text" ref="inputRef" @submit="handleSubmit"></BarInput>
    </div>
  </ElPopover>
</template>

<style lang="scss" scoped></style>
