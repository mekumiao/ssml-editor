<script setup lang="ts">
import { BarButton, DragBox } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { onMounted, reactive, ref, shallowRef, onUnmounted, nextTick } from 'vue'
import { useElementBounding } from '@vueuse/core'
import ManagementContent from './management-content.vue'
import { defaultContentData, type ContentData, type SubmitData } from './data'
import { ManagementFn } from './management-fn'
import { getEmitter } from '@/core/emitter'
import type { SSMLBaseElement } from '@/core/base'
import { emitter } from '@/event-bus'
import { useEditorStore } from '@/stores'

const dragRef = ref<InstanceType<typeof DragBox>>()
const menuRef = ref()
const contentRef = ref<InstanceType<typeof ManagementContent>>()
const visible = ref(false)
const fn = shallowRef<ManagementFn>()
const contentData = reactive<ContentData>(defaultContentData())

const { x, y, height } = useElementBounding(menuRef)

onMounted(() => {
  emitter.on('editor-created', handleEditorCreated)
  nextTick(() => {
    const { editor } = useEditorStore()
    editor && handleEditorCreated(editor)
  })
})

onUnmounted(() => {
  emitter.off('editor-created', handleEditorCreated)
  const { editor } = useEditorStore()
  getEmitter(editor)?.off('ssml-remark-click', handleSSMLRemarkClick)
})

function handleEditorCreated(editor: IDomEditor) {
  getEmitter(editor).off('ssml-remark-click', handleSSMLRemarkClick)
  getEmitter(editor).on('ssml-remark-click', handleSSMLRemarkClick)
}

function handleSSMLRemarkClick(editor: IDomEditor, elem: SSMLBaseElement) {
  if (elem.type === 'custom-management') {
    fn.value = undefined
    handleClick(editor)
  }
}

function show() {
  const call = () => {
    const pot = {
      x: x.value - 200,
      y: y.value + height.value,
    }
    dragRef.value?.setPosition(pot)
    visible.value = true
    contentRef.value?.focus()
  }
  dragRef.value?.withoutAutoClose(call)
}

function hide() {
  visible.value = false
}

function handleClick(editor: IDomEditor) {
  fn.value ??= new ManagementFn(editor)
  if (fn.value.isDisabled()) return
  const data = fn.value.readContentData()
  data && Object.assign(contentData, data)
  show()
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
    <ManagementContent
      ref="contentRef"
      @submit="handleSubmit"
      :contentData="contentData"
    ></ManagementContent>
  </DragBox>
</template>

<style lang="scss" scoped></style>
