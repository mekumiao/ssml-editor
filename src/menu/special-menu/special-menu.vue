<script setup lang="ts">
import { BarButton } from '@/components'
import { emitter } from '@/event-bus'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import { useElementBounding } from '@vueuse/core'
import SpecialFn from './special-fn'
import { EMITTER_EVENT } from '@/constant'

const menuRef = ref()
const fn = shallowRef<SpecialFn>()

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  fn.value ??= new SpecialFn(editor)
  if (fn.value.isDisabled()) return false
  fn.value.recordSelection()
  emitter.emit(EMITTER_EVENT.SPECIAL_MENU_CLICK, {
    x: x.value - 200,
    y: y.value + height.value
  })
}

function handleSpecialMenuSubmit(opt: LabelValue) {
  fn.value && !fn.value.isDisabled() && fn.value.exec(opt)
}

onMounted(() => {
  emitter.on(EMITTER_EVENT.SPECIAL_DRAG_BOX_SUBMIT, handleSpecialMenuSubmit)
})

onUnmounted(() => {
  emitter.off(EMITTER_EVENT.SPECIAL_DRAG_BOX_SUBMIT, handleSpecialMenuSubmit)
})
</script>

<template>
  <BarButton ref="menuRef" text="音效" icon="special" @click="handleClick"></BarButton>
</template>

<style lang="scss" scoped></style>
