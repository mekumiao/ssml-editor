<script setup lang="ts">
import { ElMenu, ElMenuItem, ElOption, ElSelect } from 'element-plus'
import { ref } from 'vue'

const sceneOptions = ref([
  { value: '1', label: '全部场景' },
  { value: '2', label: '全部场景' },
  { value: '3', label: '全部场景' }
])
const styleOptions = ref([
  { value: '1', label: '全部风格' },
  { value: '2', label: '全部风格' },
  { value: '3', label: '全部风格' }
])
const dataList = ref([{ text: '测试1' }, { text: '测试2' }, { text: '测试3' }, { text: '测试4' }])
</script>

<template>
  <div class="search-content">
    <div class="menu">
      <ElMenu mode="horizontal" default-active="first">
        <ElMenuItem index="first">默认音效</ElMenuItem>
        <ElMenuItem index="second">自定义音效</ElMenuItem>
        <ElMenuItem index="last">近期使用</ElMenuItem>
      </ElMenu>
    </div>
    <div class="h h-1"></div>
    <div class="flex flex-wrap">
      <ElSelect class="m m-2" placeholder="Select" size="large">
        <ElOption
          v-for="item in sceneOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
      <ElSelect class="m m-2" placeholder="Select" size="large" @change.prevent>
        <ElOption
          v-for="item in styleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </div>
    <div class="content flex flex-col scroll scroll-y h-30 font-size-15 p-2">
      <div class="btn btn-radius-2 h-5 w-full" v-for="(item, index) in dataList" :key="index">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content{
  text-align: center;
  align-items: center;
}
</style>
