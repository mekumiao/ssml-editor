<script setup lang="ts">
import { ElMenu, ElMenuItem, ElOption, ElSelect, ElInput, ElForm } from 'element-plus'
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

type MenuKey = 'first' | 'second' | 'last'
type Options = { value: string; label: string }
type MenuItemLabel = { [k in MenuKey]: string }

const emit = defineEmits<{
  submit: [value: Options]
  fetch: [filter: { search: string; menuKey: MenuKey; scene: string; style: string }]
}>()

defineProps<{
  menuItemLabel: MenuItemLabel
  scenes: Options[]
  styles: Options[]
  dataList: Options[]
}>()

const searchInput = ref('')
const sceneSelect = ref('')
const styleSelect = ref('')
const menuKey = ref<MenuKey>('first')

function handleFetchData() {
  emit('fetch', {
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

function handleSubmit(value: Options) {
  emit('submit', value)
}
</script>

<template>
  <div class="search-content">
    <ElForm @submit.prevent="handleFetchData">
      <ElInput :placeholder="'搜索'" v-model="searchInput" :suffix-icon="Search"></ElInput>
    </ElForm>
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
    <div class="h-1"></div>
    <div class="content flex flex-col">
      <div
        @click="handleSubmit(item)"
        class="btn full p-4 item"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="w-2"></div>
        <span class="iconfont icon-play"></span>
        <div class="w-1"></div>
        <div>{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  div {
    font-size: 15px;
    padding: 5px;
    text-align: left;
  }

  .item {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
}
</style>
