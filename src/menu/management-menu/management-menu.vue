<script setup lang="ts">
import { BarButton, DragBox } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { onMounted, ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import ManagementContent from './management-content.vue'
import { type ContentData, type SubmitData } from './data'
import { ManagementFn } from './management-fn'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT, WANGEDITOR_EVENT } from '@/constant'
import type { SSMLBaseElement } from '@/core/base'
import type { CustomManagement } from '@/core'
import { useManagementStore } from '@/stores'
import { storeToRefs } from 'pinia'

const dragRef = ref()
const menuRef = ref()
const visible = ref(false)
const fn = shallowRef<ManagementFn>()
const managementStore = useManagementStore()
const { contentData } = storeToRefs(managementStore)

const { x, y, height } = useElementBounding(menuRef)

onMounted(() => {
  emitter.on(EMITTER_EVENT.EDITOR_CREATED, (editor: IDomEditor) => {
    editor.on(WANGEDITOR_EVENT.SSML_ELEMENT_CLICK, (editor: IDomEditor, elem: SSMLBaseElement) => {
      if (elem.type === 'custom-management') {
        fn.value ??= new ManagementFn(editor)
        const node = elem as CustomManagement
        const data = (node.custom?.['contentData'] || {}) as ContentData
        if (data) {
          contentData.value.category = data.category
          contentData.value.name = data.name
          contentData.value.pitch = data.pitch
          contentData.value.role = data.role
          contentData.value.speed = data.speed
          contentData.value.style = data.style
        }
        setTimeout(() => {
          show()
        }, 200)
      }
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

function handleClick(editor: IDomEditor) {
  fn.value ??= new ManagementFn(editor)
  if (fn.value.isDisabled()) return
  show()
}

function handleSubmit(opt: SubmitData) {
  if (fn.value && !fn.value.isDisabled()) {
    fn.value.contentData = { ...contentData.value }
    fn.value?.exec(opt)
  }
  hide()
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" icon="management" @click="handleClick">多人配音</BarButton>
    </template>
    <ManagementContent @submit="handleSubmit"></ManagementContent>
  </DragBox>
</template>

<style lang="scss" scoped></style>
