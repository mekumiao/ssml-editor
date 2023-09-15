<script setup lang="ts">
import { ElForm, ElInput } from 'element-plus'
import { defaultFilterSpeaker, type FilterSpeaker } from '@/model'
import SpeakerAvatarList from './speaker-avatar-list.vue'
import SimpleTagList from './simple-tag-list.vue'
import { ref, nextTick, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const boxRef = ref<HTMLDivElement>()
const searchInput = ref('')
const searchInputRef = ref<InstanceType<typeof ElInput>>()
const filter = ref<FilterSpeaker>(defaultFilterSpeaker())

const visible = useElementVisibility(boxRef)

watch(visible, (newValue) => {
  newValue && searchInputFocus()
})

function handleSearchInputSubmit() {
  filter.value = { ...filter.value, word: searchInput.value }
}

function searchInputFocus() {
  nextTick(() => {
    searchInputRef.value?.input?.focus()
  })
}
</script>

<template>
  <div class="left-panle" ref="boxRef">
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
    <SimpleTagList v-model:filter="filter"></SimpleTagList>
    <div class="py-1 border-top border-secondary"></div>
    <SpeakerAvatarList :filter="filter"></SpeakerAvatarList>
  </div>
</template>

<style lang="scss" scoped></style>
