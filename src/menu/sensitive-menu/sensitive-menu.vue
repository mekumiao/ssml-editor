<script setup lang="ts">
import { BarButton } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { DragBox } from '@/components'
import SensitiveMenu from './sensitive-menu.vue'

const dragRef = ref()
const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()
const visible = ref(false)

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  edirorRef.value = editor
  dragRef.value.setPosition({
    x: x.value - 200,
    y: y.value + height.value,
  })
  visible.value = true
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" icon="sensitive" @click="handleClick">敏感词</BarButton>
    </template>
    <SensitiveMenu></SensitiveMenu>
  </DragBox>
</template>

<style lang="scss" scoped></style>
