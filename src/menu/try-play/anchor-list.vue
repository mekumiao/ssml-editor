<script setup lang="ts">
import { onMounted, ref, shallowRef, toRaw, watch } from 'vue'
import AnchorAvatar from './anchor-avatar.vue'
import type { FilterSpeaker, LabelValue, Speaker } from '@/model'
import { useTryPlayStore } from '@/stores'
import { getConfig } from '@/config'

const props = defineProps<{ filter: FilterSpeaker }>()

const ssmlEditorConfig = getConfig()
const { fetchData } = ssmlEditorConfig.tryPlay
const tryPlayStore = useTryPlayStore()

const dataList = ref<LabelValue[]>([])
const speaderCache = shallowRef<Speaker[]>([])

watch(
  () => props.filter,
  async (value) => {
    const list = await fetchData(toRaw(value))
    speaderCache.value = list
    dataList.value = list.map((v) => ({ label: v.displayName, value: v.name }))
  },
)

function handleClick(value: string) {
  const speaker = speaderCache.value.find((v) => v.name === value)
  speaker && tryPlayStore.setSpeaker(speaker)
}

onMounted(async () => {
  const list = await fetchData(toRaw(props.filter))
  speaderCache.value = list
  dataList.value = list.map((v) => ({ label: v.displayName, value: v.name }))
  if (dataList.value.length > 0) handleClick(dataList.value[0].value)
})
</script>

<template>
  <div
    style="height: 170px"
    class="w-100 d-flex flex-row flex-wrap justify-content-start overflow-x-hidden overflow-y-auto scrollbar-none"
  >
    <div class="m-3" v-for="(item, index) in dataList" :key="index">
      <AnchorAvatar
        :data="item"
        :activate="item.value === tryPlayStore.speaker.name"
        @click="handleClick(item.value)"
      ></AnchorAvatar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
