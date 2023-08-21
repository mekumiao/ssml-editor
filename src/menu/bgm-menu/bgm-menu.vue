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
  emitter.emit('bgm-menu-click', {
    x: x.value - 200,
    y: y.value + height.value
  })
}

function handleMenuSubmit(opt: LabelValue) {
  edirorRef.value?.emit('updateBgm', opt)
}

onMounted(() => {
  emitter.on('bgm-drag-box-submit', handleMenuSubmit)
})

onUnmounted(() => {
  emitter.off('gbm-drag-box-submit', handleMenuSubmit)
})
</script>

<template>
  <BarButton ref="menuRef" text="配乐" icon="bgm" @click="handleClick"></BarButton>
</template>

<style lang="scss" scoped></style>
