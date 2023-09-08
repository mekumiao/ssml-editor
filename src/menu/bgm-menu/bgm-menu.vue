<script setup lang="ts">
import { BarButton } from '@/components'
import { type IDomEditor } from '@wangeditor/editor'
import { ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import type { LabelValue } from '@/model'
import { DragBox, BarSearch } from '@/components'
import { useSSMLStore } from '@/stores'
import { injectConfig } from '@/config'

const dragRef = ref<InstanceType<typeof DragBox>>()
const menuRef = ref()
const edirorRef = shallowRef<IDomEditor>()
const globalEditConfig = injectConfig()
const { bgm } = globalEditConfig

const visible = ref(false)

const { x, y, height } = useElementBounding(menuRef)

const handleClick = async (editor: IDomEditor) => {
  const pot = {
    x: x.value - 300,
    y: y.value + height.value,
  }
  edirorRef.value = editor
  dragRef.value?.setPosition(pot)
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
      <BarButton ref="menuRef" icon="bgm" @click="handleClick">配乐</BarButton>
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
