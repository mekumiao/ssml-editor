<script setup lang="ts">
import { BarButton } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import type { LabelValue } from '@/model'
import { DragBox, BarSearch } from '@/components'
import { useEditorStore, useSSMLStore } from '@/stores'

const dragRef = ref()
const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()
const { globalEditConfig } = useEditorStore()
const { bgm } = globalEditConfig

const visible = ref(false)

const { x, y, height } = useElementBounding(menuRef)

const handleClick = async (editor: IDomEditor) => {
  const pot = {
    x: x.value - 300,
    y: y.value + height.value,
  }
  edirorRef.value = editor
  dragRef.value.setPosition(pot)
  visible.value = true
}

function handleSubmit(opt: LabelValue) {
  const { rootBackgroundaudio } = useSSMLStore()
  rootBackgroundaudio.src = opt.value
  rootBackgroundaudio.remark = opt.label
  visible.value = false
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" text="配乐" icon="bgm" @click="handleClick"></BarButton>
    </template>
    <BarSearch
      :menus="bgm.menus"
      :fetchScene="bgm.fetchScene"
      :fetchStyle="bgm.fetchStyle"
      :fetchData="bgm.fetchData"
      @submit="handleSubmit"
    ></BarSearch>
  </DragBox>
</template>

<style lang="scss" scoped></style>
