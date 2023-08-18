<script setup lang="ts">
import { ElMenu, ElMenuItem, ElOption, ElSelect, ElInput, ElForm } from 'element-plus'
import { ref } from 'vue'

type MenuKey = 'first' | 'second' | 'last'
type Options = { value: string; label: string }

const emit = defineEmits<{
  submit: [value: string]
  fetch: [filter: { search: string; menuKey: MenuKey; scene: string; style: string }]
}>()

defineProps<{ scenes: Options[]; styles: Options[]; dataList: Options[] }>()

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

function handleSelect(value: string) {
  emit('submit', value)
}
</script>

<template>
  <div class="search-content">
    <ElForm @submit.prevent="handleFetchData">
      <ElInput v-model="searchInput"></ElInput>
    </ElForm>
    <div class="menu">
      <ElMenu
        mode="horizontal"
        default-active="first"
        @select="(index: string) => handleMenuSelect(index as MenuKey)"
      >
        <ElMenuItem index="first">默认音效</ElMenuItem>
        <ElMenuItem index="second">自定义音效</ElMenuItem>
        <ElMenuItem index="last">近期使用</ElMenuItem>
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
        @click="handleSelect(item.value)"
        class="btn full p-4"
        v-for="(item, index) in dataList"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  div {
    font-size: 15px;
    padding: 5px;
  }
}
</style>
