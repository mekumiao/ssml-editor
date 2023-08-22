<script setup lang="ts">
import { DragBox, BarSearch } from '@/components'
import { onMounted, onUnmounted, ref } from 'vue'
import { emitter } from '@/event-bus'
import { type Position } from '@vueuse/core'
import { EMITTER_EVENT } from '@/constant'
import type { LabelValue } from '@/model'

const visible = ref(false)
const position = ref<Position>({ x: 20, y: 20 })
const menuItemLabel = { first: '默认音效', second: '自定义音效', last: '最近音效' }
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
  emitter.on(EMITTER_EVENT.SPECIAL_MENU_CLICK, handleSpecialMenuClick)
})

onUnmounted(() => {
  emitter.off(EMITTER_EVENT.SPECIAL_MENU_CLICK, handleSpecialMenuClick)
})

function fetchSpecial(filter: {
  search: string
  menuKey: 'first' | 'second' | 'last'
  scene: string
  style: string
}): Promise<{ value: string; label: string }[]> {
  return Promise.resolve([
    {
      value: 'https://download.samplelib.com/wav/sample-3s.wav#1',
      label: `${filter.search || '测试'}音效1`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-3s.wav#2',
      label: `${filter.menuKey || '测试'}音效2`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-3s.wav#3',
      label: `${filter.scene || '测试'}音效3`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-3s.wav#4',
      label: `${filter.style || '测试'}音效4`
    }
  ])
}

async function handleSpecialMenuClick(pot: Position) {
  position.value = pot
  visible.value = true
  dataList.value ??= await fetchSpecial({ search: '', menuKey: 'first', scene: '', style: '' })
}

function handleSubmit(value: LabelValue) {
  visible.value = false
  emitter.emit(EMITTER_EVENT.SPECIAL_DRAG_BOX_SUBMIT, value)
}
</script>

<template>
  <DragBox v-model:visible="visible" v-model:position="position">
    <BarSearch
      :menuItemLabel="menuItemLabel"
      :scenes="scenes"
      :styles="styles"
      :dataList="dataList"
      :fetch="fetchSpecial"
      @submit="handleSubmit"
    ></BarSearch>
  </DragBox>
</template>

<style lang="scss" scoped></style>
