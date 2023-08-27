<script setup lang="ts">
import { ElMenu, ElMenuItem, ElOption, ElSelect, ElInput, ElForm } from 'element-plus'
import { onMounted, ref, toRaw, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useElementVisibility } from '@vueuse/core'
import type { LabelValue } from '@/model'
import type { BarSearchMenuKey, BarSearchMenuItemLabel } from './data'

const emit = defineEmits<{ submit: [value: LabelValue] }>()

const props = defineProps<{
  menuItemLabel: BarSearchMenuItemLabel
  scenes: LabelValue[]
  styles: LabelValue[]
  dataList?: LabelValue[]
  fetch: (filter: {
    search: string
    menuKey: BarSearchMenuKey
    scene: string
    style: string
  }) => Promise<{ value: string; label: string }[]>
}>()

const searchInputRef = ref<HTMLElement>()
const searchInput = ref('')
const sceneSelect = ref('')
const styleSelect = ref('')
const dataListRef = ref<LabelValue[]>(props.dataList || [])
const menuKey = ref<BarSearchMenuKey>('default')

const isVisible = useElementVisibility(searchInputRef)

watch(isVisible, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      searchInputRef.value?.focus()
    }, 100)
  }
})

onMounted(async () => {
  if (!dataListRef.value.length) await handleFetchData()
})

async function handleFetchData() {
  dataListRef.value = await props.fetch({
    search: searchInput.value,
    menuKey: menuKey.value,
    scene: sceneSelect.value,
    style: styleSelect.value,
  })
}

function handleMenuSelect(key: BarSearchMenuKey) {
  menuKey.value = key
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
        default-active="default"
        @select="(index: string) => handleMenuSelect(index as BarSearchMenuKey)"
      >
        <ElMenuItem index="default">{{ menuItemLabel.default }}</ElMenuItem>
        <ElMenuItem index="custom">{{ menuItemLabel.custom }}</ElMenuItem>
        <ElMenuItem index="history">{{ menuItemLabel.history }}</ElMenuItem>
      </ElMenu>
    </div>
    <div class="flex flex-row pt-1">
      <ElSelect v-model="sceneSelect" @change="handleFetchData" class="m-1" size="default">
        <ElOption
          v-for="item in scenes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
      <ElSelect v-model="styleSelect" @change="handleFetchData" class="m-1" size="default">
        <ElOption
          v-for="item in styles"
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
        v-for="(item, index) in dataListRef"
        :key="index"
      >
        <span class="iconfont icon-play"></span>
        <span class="ps-2">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
