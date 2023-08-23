<script setup lang="ts">
import { BarButton } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef, inject } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { PROVIDER_KEY } from '@/constant'
import type { LabelValue } from '@/model'
import { DragBox, BarSearch } from '@/components'
import type { SSMLEditorConfig } from '@/config'

const config = inject<SSMLEditorConfig>(PROVIDER_KEY.EDITORCONFIG)!

const dragRef = ref()
const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()
const visible = ref(false)
const menuItemLabel = { first: '默认配乐', second: '自定义配乐', last: '最近配乐' }
const scenes = [
  { value: '', label: '全部场景' },
  { value: '2', label: '场景2' },
  { value: '3', label: '场景3' }
] as LabelValue[]
const styles = [
  { value: '', label: '全部风格' },
  { value: '2', label: '风格2' },
  { value: '3', label: '风格3' }
] as LabelValue[]
const dataList = ref<LabelValue[]>()

const { x, y, height } = useElementBounding(menuRef)

const handleClick = (editor: IDomEditor) => {
  const pot = {
    x: x.value - 200,
    y: y.value + height.value
  }
  edirorRef.value = editor
  dragRef.value.setPosition(pot)
}

function handleSubmit(opt: LabelValue) {
  console.log(opt)
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #refenence>
      <BarButton ref="menuRef" text="敏感词" icon="sensitive" @click="handleClick"></BarButton>
    </template>
    <BarSearch
      :menuItemLabel="menuItemLabel"
      :scenes="scenes"
      :styles="styles"
      :dataList="dataList"
      :fetch="config.fetchBgm"
      @submit="handleSubmit"
    ></BarSearch>
  </DragBox>
</template>

<style lang="scss" scoped></style>
