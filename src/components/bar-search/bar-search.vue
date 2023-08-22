<script setup lang="ts">
import { ElMenu, ElMenuItem, ElOption, ElSelect, ElInput, ElForm } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useElementVisibility } from '@vueuse/core'
import type { LabelValue } from '@/model'

type MenuKey = 'first' | 'second' | 'last'
type MenuItemLabel = { [k in MenuKey]: string }

const emit = defineEmits<{ submit: [value: LabelValue] }>()

const props = defineProps<{
  menuItemLabel: MenuItemLabel
  scenes: LabelValue[]
  styles: LabelValue[]
  dataList?: LabelValue[]
  fetch: (filter: {
    search: string
    menuKey: MenuKey
    scene: string
    style: string
  }) => Promise<{ value: string; label: string }[]>
}>()

const searchInputRef = ref<HTMLElement>()
const searchInput = ref('')
const sceneSelect = ref('')
const styleSelect = ref('')
const dataListRef = ref<LabelValue[]>(props.dataList || [])
const menuKey = ref<MenuKey>('first')

const isVisible = useElementVisibility(searchInputRef)

watch(isVisible, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      searchInputRef.value?.focus()
    }, 100)
  }
})

onMounted(async () => {
  await handleFetchData()
})

async function handleFetchData() {
  dataListRef.value = await props.fetch({
    search: searchInput.value,
    menuKey: menuKey.value,
    scene: sceneSelect.value,
    style: styleSelect.value
  })
}

function handleMenuSelect(key: MenuKey) {
  menuKey.value = key
  handleFetchData()
}

function handleSubmit(value: LabelValue) {
  emit('submit', value)
}
</script>

<template>
  <div class="search-content vh-50">
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
    <div class="menu">
      <ElMenu
        mode="horizontal"
        default-active="first"
        @select="(index: string) => handleMenuSelect(index as MenuKey)"
      >
        <ElMenuItem index="first">{{ menuItemLabel.first }}</ElMenuItem>
        <ElMenuItem index="second">{{ menuItemLabel.second }}</ElMenuItem>
        <ElMenuItem index="last">{{ menuItemLabel.last }}</ElMenuItem>
      </ElMenu>
    </div>
    <div class="h h-1"></div>
    <div class="flex flex-row">
      <ElSelect v-model="sceneSelect" @change="handleFetchData" class="m m-2" size="large">
        <ElOption
          v-for="item in scenes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
      <ElSelect v-model="styleSelect" @change="handleFetchData" class="m m-2" size="large">
        <ElOption
          v-for="item in styles"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </div>
    <div class="h-"></div>
    <div class="content-list w-90">
      <div
        @click="handleSubmit(item)"
        class="content-list-item clickable ps-3"
        v-for="(item, index) in dataListRef"
        :key="index"
      >
        <span class="iconfont icon-play"></span>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-content {
  .content-list {
    .content-list-item {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
      height: 6vh;
      width: 100%;
      border-radius: 0.25rem;
    }
  }
}
</style>
