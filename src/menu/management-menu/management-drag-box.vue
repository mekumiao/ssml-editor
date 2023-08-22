<script setup lang="ts">
import { DragBox, BarSearch } from '@/components'
import { onMounted, onUnmounted, ref } from 'vue'
import { emitter } from '@/event-bus'
import { type Position } from '@vueuse/core'
import { EMITTER_EVENT } from '@/constant'
import type { LabelValue } from '@/model'

const visible = ref(false)
const position = ref<Position>({ x: 20, y: 20 })
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

onMounted(() => {
  emitter.on(EMITTER_EVENT.MANAGEMENT_MENU_CLICK, handleMenuClick)
})

onUnmounted(() => {
  emitter.off(EMITTER_EVENT.MANAGEMENT_MENU_CLICK, handleMenuClick)
})

function fetchManagement(filter: {
  search: string
  menuKey: 'first' | 'second' | 'last'
  scene: string
  style: string
}): Promise<{ value: string; label: string }[]> {
  return Promise.resolve([
    {
      value: 'https://download.samplelib.com/wav/sample-6s.wav#1',
      label: `${filter.search || '测试'}背景音乐1`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-6s.wav#2',
      label: `${filter.menuKey || '测试'}背景音乐2`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-6s.wav#3',
      label: `${filter.scene || '测试'}背景音乐3`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-6s.wav#4',
      label: `${filter.style || '测试'}背景音乐4`
    }
  ])
}

async function handleMenuClick(pot: Position) {
  position.value = pot
  visible.value = true
  dataList.value ??= await fetchManagement({ search: '', menuKey: 'first', scene: '', style: '' })
}

function handleSubmit(value: LabelValue) {
  visible.value = false
  emitter.emit(EMITTER_EVENT.MANAGEMENT_DRAG_BOX_SUBMIT, value)
}
</script>

<template>
  <DragBox v-model:visible="visible" v-model:position="position">
    <BarSearch
      :menuItemLabel="menuItemLabel"
      :scenes="scenes"
      :styles="styles"
      :dataList="dataList"
      :fetch="fetchManagement"
      @submit="handleSubmit"
    ></BarSearch>
  </DragBox>
</template>

<style lang="scss" scoped></style>
