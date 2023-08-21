<script setup lang="ts">
import { BarButton } from '@/components'
import { emitter } from '@/event-bus'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { EMITTER_EVENT } from '@/constant'

const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  edirorRef.value = editor
  emitter.emit(EMITTER_EVENT.SENSITIVE_MENU_CLICK, {
    x: x.value - 200,
    y: y.value + height.value
  })
}

function handleMenuSubmit(opt: LabelValue) {
  console.log(opt)
}

onMounted(() => {
  emitter.on(EMITTER_EVENT.SENSITIVE_DRAG_BOX_SUBMIT, handleMenuSubmit)
})

onUnmounted(() => {
  emitter.off(EMITTER_EVENT.SENSITIVE_DRAG_BOX_SUBMIT, handleMenuSubmit)
})
</script>

<template>
  <BarButton ref="menuRef" text="敏感词" icon="sensitive" @click="handleClick"></BarButton>
</template>

<style lang="scss" scoped></style>
