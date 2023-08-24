<script setup lang="ts">
import { BarButton } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef, inject } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { PROVIDER_KEY, WANGEDITOR_EVENT } from '@/constant'
import type { LabelValue } from '@/model'
import { DragBox, BarSearch } from '@/components'
import type { GlobalEditorConfig } from '@/config'

const dragRef = ref()
const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()

const visible = ref(false)

const config = inject<GlobalEditorConfig>(PROVIDER_KEY.EDITORCONFIG)!

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

const { x, y, height } = useElementBounding(menuRef)

const handleClick = async (editor: IDomEditor) => {
  const pot = {
    x: x.value - 300,
    y: y.value + height.value
  }
  edirorRef.value = editor
  dragRef.value.setPosition(pot)
  visible.value = true
}

function handleSubmit(opt: LabelValue) {
  edirorRef.value?.emit(WANGEDITOR_EVENT.UPDATE_BGM, opt)
  visible.value = false
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" text="配乐" icon="bgm" @click="handleClick"></BarButton>
    </template>
    <BarSearch
      :menuItemLabel="menuItemLabel"
      :scenes="scenes"
      :styles="styles"
      :fetch="config.fetchBgm"
      @submit="handleSubmit"
    ></BarSearch>
  </DragBox>
</template>

<style lang="scss" scoped></style>
