<script setup lang="ts">
import { BarButton } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import type { LabelValue } from '@/model'
import { DragBox } from '@/components'
import ConversionContent from './conversion-content.vue'
import { ConversionFn } from './conversion-fn'

const dragRef = ref<InstanceType<typeof DragBox>>()
const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()
const fn = shallowRef<ConversionFn>()

const visible = ref(false)
const text = ref('')

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  fn.value ??= new ConversionFn(editor)
  if (fn.value.isDisabled()) return
  text.value = fn.value.getValue()
  const pot = {
    x: x.value - 200,
    y: y.value + height.value,
  }
  edirorRef.value = editor
  dragRef.value?.setPosition(pot)
  visible.value = true
}

function handleMenuSubmit(opt: LabelValue) {
  fn.value?.exec(opt)
  visible.value = false
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" icon="conversion" @click="handleClick">局部变音</BarButton>
    </template>
    <ConversionContent :text="text" @submit="handleMenuSubmit"></ConversionContent>
  </DragBox>
</template>

<style lang="scss" scoped></style>
