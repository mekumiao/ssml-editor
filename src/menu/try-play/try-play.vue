<script setup lang="ts">
import { FixedPanel } from '@/components'
import AnchorList from './anchor-list.vue'
import TagList from './tag-list.vue'
import TagItem from './tag-item.vue'
import TryPlayCircle from './try-play-circle.vue'
import { ElInput, ElForm } from 'element-plus'
import { ref } from 'vue'

const searchInput = ref('')
const isCollapse = ref(true)
const isDragging = ref(false)

function handleDragging(value: boolean) {
  if (!value && isDragging.value) {
    setTimeout(() => {
      isDragging.value = false
    }, 200)
    return
  }
  isDragging.value = value
}

function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <FixedPanel @dragging="handleDragging">
    <div v-show="isCollapse" @click="() => !isDragging && toggleCollapse()">
      <TryPlayCircle></TryPlayCircle>
    </div>
    <div v-show="!isCollapse" class="try-play card shadow px-2 pb-2">
      <div class="try-play-header d-flex flex-row justify-content-end">
        <span @click="toggleCollapse" class="iconfont icon-full text-white">缩小</span>
      </div>
      <div class="try-play-body w-100 h-100 d-flex flex-row">
        <div class="try-play-left w-50">
          <div>
            <ElForm>
              <ElInput v-model="searchInput" placeholder="输入名称搜索"></ElInput>
            </ElForm>
          </div>
          <div class="type-list d-flex flex-row border-bottom border-secondary">
            <TagItem>热榜</TagItem>
            <TagItem>SVIP</TagItem>
            <TagItem>付费</TagItem>
          </div>
          <TagList></TagList>
          <div class="py-1"></div>
          <AnchorList></AnchorList>
        </div>
        <div class="try-play-right border border-secondary w-50">right</div>
      </div>
    </div>
  </FixedPanel>
</template>

<style lang="scss" scoped>
.try-play {
  width: 130vh;
  height: 70vh;
  background-color: #2254a1;

  .try-play-header {
    height: 50px;
  }

  .try-play-body {
    height: 50vh;
  }
}
</style>
