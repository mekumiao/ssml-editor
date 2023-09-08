<script setup lang="ts">
import { type IDomEditor } from '@wangeditor/editor'
import { shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ContinuousFn } from './continuous-fn'

const fn = shallowRef<ContinuousFn>()

function handleClick(editor: IDomEditor) {
  fn.value ??= new ContinuousFn(editor)
  if (fn.value.isDisabled()) return
  fn.value.exec()
}
</script>

<template>
  <BarButton icon="continuous" @click="handleClick">连读</BarButton>
</template>

<style lang="scss" scoped></style>
