<script setup lang="ts">
import { BarButton } from '@/components'
import { emitter } from '@/event-bus'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import { useElementBounding } from '@vueuse/core'

const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  edirorRef.value = editor
  emitter.emit('management-menu-click', {
    x: x.value - 200,
    y: y.value + height.value
  })
}

function handleMenuSubmit(opt: LabelValue) {
  edirorRef.value?.emit('management', opt)
}

onMounted(() => {
  emitter.on('management-drag-box-submit', handleMenuSubmit)
})

onUnmounted(() => {
  emitter.off('management-drag-box-submit', handleMenuSubmit)
})
</script>

<template>
  <BarButton ref="menuRef" text="多人配音" icon="management" @click="handleClick"></BarButton>
</template>

<style lang="scss" scoped></style>
