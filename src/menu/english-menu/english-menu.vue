<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { selectionTrimEnd } from '@/core/helper'
import { ElPopover } from 'element-plus'
import { EnglishFn } from './english-fn'
import type { LabelValue } from '@/model'
import { WANGEDITOR_EVENT } from '@/constant'
import { injectConfig } from '@/config'

const globalEditConfig = injectConfig()
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
    englishList.value = await globalEditConfig.english.fetchData(text)

    if (englishList.value.length <= 0) {
      return editor.emit(WANGEDITOR_EVENT.ERROR, '找不到单词的音标')
    }

    show()
  }
}

function handleItemClick(item: LabelValue) {
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
      <BarButton text="音标" icon="english" @click="handleClick"></BarButton>
    </template>
    <div class="ssml-editor-root d-flex flex-column p-2" @mousedown.stop.prevent>
      <div
        v-for="(item, index) in englishList"
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
