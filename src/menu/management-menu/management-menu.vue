<script setup lang="ts">
import { BarButton, DragBox } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { onMounted, reactive, ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import ManagementContent from './management-content.vue'
import { defaultContentData, type ContentData, type SubmitData } from './data'
import { ManagementFn } from './management-fn'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT, WANGEDITOR_EVENT } from '@/constant'
import type { SSMLBaseElement } from '@/core/base'

const dragRef = ref()
const menuRef = ref()
const visible = ref(false)
const fn = shallowRef<ManagementFn>()
const contentData = reactive<ContentData>(defaultContentData())

const { x, y, height } = useElementBounding(menuRef)

onMounted(() => {
  emitter.on(EMITTER_EVENT.EDITOR_CREATED, (editor: IDomEditor) => {
    editor.on(WANGEDITOR_EVENT.SSML_ELEMENT_CLICK, (editor: IDomEditor, elem: SSMLBaseElement) => {
      if (elem.type === 'custom-management') handleClick(editor, true)
    })
  })
})

function show() {
  const pot = {
    x: x.value - 200,
    y: y.value + height.value,
  }
  dragRef.value?.setPosition(pot)
  visible.value = true
}

function hide() {
  visible.value = false
}

function handleClick(editor: IDomEditor, asyncShow?: boolean) {
  fn.value ??= new ManagementFn(editor)
  if (fn.value.isDisabled()) return
  const data = fn.value.readContentData()
  data && Object.assign(contentData, data)
  asyncShow ? setTimeout(() => show(), 200) : show()
}

function handleSubmit(opt: SubmitData) {
  fn.value?.exec(opt, { ...contentData })
  hide()
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" icon="management" @click="handleClick">多人配音</BarButton>
    </template>
    <ManagementContent @submit="handleSubmit" :contentData="contentData"></ManagementContent>
  </DragBox>
</template>

<style lang="scss" scoped></style>
