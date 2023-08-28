<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from 'vue'
import AnchorAvatar from './anchor-avatar.vue'
import type { FilterSpeaker, Speaker } from '@/model'
import { useEditorStore, useTryPlayStore } from '@/stores'

const props = defineProps<{ filter: FilterSpeaker }>()

const { globalEditConfig } = useEditorStore()
const { fetchData } = globalEditConfig.tryPlay
const tryPlayStore = useTryPlayStore()

const dataList = ref<Speaker[]>([])

watch(
  () => props.filter,
  async (value) => {
    dataList.value = await fetchData(toRaw(value))
  },
  { immediate: true },
)

function handleClick(value: Speaker) {
  tryPlayStore.setSpeaker(value)
}

onMounted(() => {})
</script>

<template>
  <div
    style="height: 170px"
    class="w-100 d-flex flex-row flex-wrap justify-content-start overflow-x-hidden overflow-y-auto scrollbar-none"
  >
    <div class="m-3" v-for="(item, index) in dataList" :key="index">
      <AnchorAvatar
        :data="item"
        :activate="item.value === tryPlayStore.speaker.value"
        @click="handleClick(toRaw(item))"
      ></AnchorAvatar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
