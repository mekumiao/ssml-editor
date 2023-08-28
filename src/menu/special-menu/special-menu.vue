<script setup lang="ts">
import { BarButton } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { SpecialFn } from './special-fn'
import type { LabelValue } from '@/model'
import { DragBox, BarSearch } from '@/components'
import { useEditorStore } from '@/stores'

const dragRef = ref()
const menuRef = ref()
const fn = shallowRef<SpecialFn>()
const { globalEditConfig } = useEditorStore()
const { special } = globalEditConfig

const visible = ref(false)

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  fn.value ??= new SpecialFn(editor)
  if (fn.value.isDisabled()) return
  dragRef.value.setPosition({
    x: x.value - 200,
    y: y.value + height.value,
  })
  visible.value = true
}

function handleSubmit(opt: LabelValue) {
  fn.value?.restoreSelection()
  if (fn.value && !fn.value.isDisabled()) {
    fn.value.exec(opt)
  }
  visible.value = false
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" text="音效" icon="special" @click="handleClick"></BarButton>
    </template>
    <BarSearch
      :menus="special.menus"
      :fetchScene="special.fetchScene"
      :fetchStyle="special.fetchStyle"
      :fetchData="special.fetchData"
      @submit="handleSubmit"
    ></BarSearch>
  </DragBox>
</template>

<style lang="scss" scoped></style>
