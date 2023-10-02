<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton, BarPopover } from '@/components'
import { selectionTrimEnd } from '@/core/helper'
import { EnglishFn } from './english-fn'
import type { LabelValue } from '@/model'
import { emitter } from '@/event-bus'
import { getConfig } from '@/config'

const ssmlEditorConfig = getConfig()
const fn = shallowRef<EnglishFn>()
const englishList = ref<LabelValue[]>([])
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
  fn.value ??= new EnglishFn(editor)
  selectionTrimEnd(editor)
  if (fn.value.isDisabled()) return
  const text = fn.value.getValue()
  if (text) {
    try {
      englishList.value = await ssmlEditorConfig.english.fetchData(text)
    } catch (error) {
      emitter.emit('error', error)
    }
    if (englishList.value.length <= 0) {
      return emitter.emit('warn', '找不到单词的音标')
    }

    show()
  }
}

function handleItemClick(item: LabelValue) {
  fn.value?.exec({ ...item })
  hide()
}
</script>

<template>
  <BarPopover v-model:visible="visible">
    <template #reference>
      <BarButton icon="english" @click="handleClick">音标</BarButton>
    </template>
    <div class="d-flex flex-column">
      <div
        v-for="(item, index) in englishList"
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
