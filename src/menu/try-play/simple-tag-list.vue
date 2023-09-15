<script setup lang="ts">
import SimpleTag from './simple-tag.vue'
import { onMounted, ref, toRaw } from 'vue'
import type { FilterSpeaker, LabelValue } from '@/model'
import { getConfig } from '@/config'

const emit = defineEmits<{ 'update:filter': [value: FilterSpeaker] }>()
const props = defineProps<{ filter: FilterSpeaker }>()

const ssmlEditorConfig = getConfig()
const { topFlag, gender, featchTag } = ssmlEditorConfig.tryPlay

const tags = ref<LabelValue[]>([])

onMounted(async () => {
  tags.value = await featchTag()
})

function handleTopFlagClick(value: string) {
  emit('update:filter', { ...toRaw(props.filter), topFlag: value })
}

function handleGenderClick(value: string) {
  emit('update:filter', { ...toRaw(props.filter), gender: value })
}

function handleTagsClick(value: string) {
  emit('update:filter', { ...toRaw(props.filter), tag: value })
}
</script>

<template>
  <div class="tag-list w-100">
    <div
      class="w-100 d-flex flex-row border-bottom border-secondary align-items-center"
      style="height: 40px"
    >
      <SimpleTag
        @click="handleTopFlagClick"
        v-for="(item, index) in topFlag"
        :key="index"
        :value="item.value"
        :activate="filter.topFlag === item.value"
      >
        {{ item.label }}
      </SimpleTag>
    </div>
    <div
      class="w-100 d-flex flex-row border-bottom border-secondary align-items-center"
      style="height: 40px"
    >
      <SimpleTag
        @click="handleGenderClick"
        v-for="(item, index) in gender"
        :key="index"
        :value="item.value"
        :activate="filter.gender === item.value"
      >
        {{ item.label }}
      </SimpleTag>
    </div>
    <div
      style="height: 100px"
      class="w-100 pt-2 d-flex flex-row flex-wrap align-content-start row-gap-2 overflow-y-auto overflow-x-hidden scrollbar-none"
    >
      <SimpleTag
        @click="handleTagsClick"
        v-for="(item, index) in tags"
        :key="index"
        :value="item.value"
        :activate="filter.tag === item.value"
      >
        {{ item.label }}
      </SimpleTag>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
