<script setup lang="ts">
import { ElMenu, ElMenuItem, ElOption, ElSelect, ElInput, ElForm } from 'element-plus'
import { onMounted, ref, toRaw, watch, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useElementVisibility } from '@vueuse/core'
import type { LabelValue } from '@/model'
import type { FilterBarSearch } from './data'

const emit = defineEmits<{ submit: [value: LabelValue] }>()

const props = defineProps<{
  menus: LabelValue[]
  fetchScene: () => Promise<LabelValue[]>
  fetchStyle: () => Promise<LabelValue[]>
  fetchData: (filter: FilterBarSearch) => Promise<LabelValue[]>
  sceneList?: LabelValue[]
  styleList?: LabelValue[]
  dataList?: LabelValue[]
}>()

const searchInputRef = ref<InstanceType<typeof ElInput>>()
const searchInput = ref('')
const sceneSelect = ref('')
const styleSelect = ref('')
const menuSelect = ref('')

const dataListCache = ref<LabelValue[]>(props.dataList || [])
const sceneListCache = ref<LabelValue[]>(props.sceneList || [])
const styleListCache = ref<LabelValue[]>(props.styleList || [])

const isVisible = useElementVisibility(searchInputRef as any)

watch(isVisible, (newValue) => {
  if (newValue) {
    nextTick(() => {
      searchInputRef.value?.input?.focus()
    })
  }
})

onMounted(async () => {
  if (!dataListCache.value.length) await handleFetchData()
  if (!sceneListCache.value.length) sceneListCache.value = await props.fetchScene()
  if (!styleListCache.value.length) styleListCache.value = await props.fetchStyle()
})

async function handleFetchData() {
  dataListCache.value = await props.fetchData({
    word: searchInput.value,
    menu: menuSelect.value,
    scene: sceneSelect.value,
    style: styleSelect.value,
  })
}

function handleMenuSelect(value: string) {
  menuSelect.value = value
  handleFetchData()
}

function handleSubmit(value: LabelValue) {
  emit('submit', value)
}
</script>

<template>
  <div class="search-content w-100">
    <div class="ps-2 w-75">
      <ElForm @submit.prevent="handleFetchData">
        <ElInput
          ref="searchInputRef"
          :placeholder="'搜索'"
          v-model="searchInput"
          :suffix-icon="Search"
        ></ElInput>
      </ElForm>
    </div>
    <div class="menu ps-2">
      <ElMenu
        mode="horizontal"
        :default-active="menus.length > 0 ? menus[0].value : ''"
        @select="(value) => handleMenuSelect(value)"
      >
        <ElMenuItem :index="item.value" v-for="(item, index) in menus" :key="index">
          {{ item.label }}
        </ElMenuItem>
      </ElMenu>
    </div>
    <div class="flex flex-row pt-1">
      <ElSelect v-model="sceneSelect" @change="handleFetchData" class="m-1" size="default">
        <ElOption
          v-for="item in sceneListCache"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
      <ElSelect v-model="styleSelect" @change="handleFetchData" class="m-1" size="default">
        <ElOption
          v-for="item in styleListCache"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </div>
    <ul class="content-list overflow-x-hidden overflow-y-auto py-2" style="height: 250px">
      <li
        @click="handleSubmit(toRaw(item))"
        class="content-list-item clickable ps-2 py-2"
        v-for="(item, index) in dataListCache"
        :key="index"
      >
        <span class="iconfont icon-play"></span>
        <span class="ps-2">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
