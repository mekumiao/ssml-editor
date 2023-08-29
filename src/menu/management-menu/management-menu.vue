<script setup lang="ts">
import { BarButton, DragBox } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import ManagementContent from './management-content.vue'
import type { SubmitData } from './data'
import { ManagementFn } from './management-fn'

const dragRef = ref()
const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()
const visible = ref(false)
const fn = shallowRef<ManagementFn>()

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  fn.value ??= new ManagementFn(editor)
  const pot = {
    x: x.value - 200,
    y: y.value + height.value,
  }
  edirorRef.value = editor
  dragRef.value.setPosition(pot)
  visible.value = true
}

function handleSubmit(opt: SubmitData) {
  if (fn.value && !fn.value.isDisabled()) {
    fn.value?.exec(opt)
  }
  visible.value = false
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" text="多人配音" icon="management" @click="handleClick"></BarButton>
    </template>
    <ManagementContent @submit="handleSubmit"></ManagementContent>
  </DragBox>
</template>

<style lang="scss" scoped></style>
