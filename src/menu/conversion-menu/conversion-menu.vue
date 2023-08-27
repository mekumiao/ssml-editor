<script setup lang="ts">
import { BarButton } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import type { LabelValue } from '@/model'
import { DragBox } from '@/components'
import ConversionContent from './conversion-content.vue'

const dragRef = ref()
const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()

const visible = ref(false)
const text = ref('ttttt')

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  const pot = {
    x: x.value - 200,
    y: y.value + height.value,
  }
  edirorRef.value = editor
  dragRef.value.setPosition(pot)
  visible.value = true
}

function handleMenuSubmit(opt: LabelValue) {
  console.log(opt)
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" text="局部变音" icon="conversion" @click="handleClick"></BarButton>
    </template>
    <ConversionContent :text="text" @submit="handleMenuSubmit"></ConversionContent>
  </DragBox>
</template>

<style lang="scss" scoped></style>
