<script setup lang="ts">
import AnchorList from './anchor-list.vue'
import TagList from './tag-list.vue'
import TagItem from './tag-item.vue'
import { ElInput, ElForm, ElIcon } from 'element-plus'
import { ref } from 'vue'
import { withLimitView } from '@/components'
import { useDraggable } from '@vueuse/core'
import { Minus } from '@element-plus/icons-vue'

const emit = defineEmits<{ 'update:visible': [value: boolean] }>()
defineProps<{ visible: boolean }>()

const searchInput = ref('')
// const visible = ref(true)
// const isDragging = ref(false)
const boxRef = ref()
const handleRef = ref()

const { style } = withLimitView(
  boxRef,
  useDraggable(handleRef, {
    onStart: () => {
      // isDragging.value = true
    },
    onEnd: () => {
      // isDragging.value = false
    }
  })
)

// function handleDragging(value: boolean) {
//   if (!value && isDragging.value) {
//     setTimeout(() => {
//       isDragging.value = false
//     }, 200)
//     return
//   }
//   isDragging.value = value
// }

function handleMinus() {
  emit('update:visible', false)
}
</script>

<template>
  <div
    ref="boxRef"
    v-show="visible"
    :style="style"
    style="position: fixed"
    class="try-play user-select-none card z-3 shadow px-2 pb-2"
  >
    <div class="try-play-header d-flex flex-row justify-content-between align-items-center">
      <div ref="handleRef" class="w-100 h-100"></div>
      <div @click="handleMinus" class="px-2 py-1 try-play-menu-close">
        <ElIcon color="white"><Minus></Minus></ElIcon>
      </div>
    </div>
    <div>
      <div class="try-play-body w-100 h-100 d-flex flex-row">
        <div class="try-play-left w-50">
          <div>
            <ElForm @submit.prevent>
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
  </div>
</template>

<style lang="scss" scoped>
.try-play {
  width: 130vh;
  height: 70vh;
  background-color: #2254a1;

  .try-play-header {
    height: 35px;
    cursor: move;
  }

  .try-play-body {
    height: 50vh;
  }

  .try-play-menu-close {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
