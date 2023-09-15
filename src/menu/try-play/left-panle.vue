<script setup lang="ts">
import { defaultFilterSpeaker, type FilterSpeaker } from '@/model'
import AnchorList from './anchor-list.vue'
import TagList from './tag-list.vue'
import { ref } from 'vue'

const searchInput = ref('')
const filter = ref<FilterSpeaker>(defaultFilterSpeaker())

function handleSearchInputSubmit() {
  filter.value = { ...filter.value, word: searchInput.value }
}
</script>

<template>
  <div class="left-panle">
    <div class="pe-1">
      <ElForm @submit.prevent="handleSearchInputSubmit">
        <ElInput
          :input-style="{ color: 'white' }"
          ref="searchInputRef"
          v-model="searchInput"
          placeholder="输入名称搜索"
        ></ElInput>
      </ElForm>
    </div>
    <TagList v-model:filter="filter"></TagList>
    <div class="py-1 border-top border-secondary"></div>
    <AnchorList :filter="filter"></AnchorList>
  </div>
</template>

<style lang="scss" scoped></style>
