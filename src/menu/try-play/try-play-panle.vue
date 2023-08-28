<script setup lang="ts">
import AnchorList from './anchor-list.vue'
import TagList from './tag-list.vue'
import SliderPanle from './slider-panle.vue'
import { ElInput, ElForm, ElIcon } from 'element-plus'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { constrainDragBounds } from '@/components'
import { useDraggable } from '@vueuse/core'
import { Minus } from '@element-plus/icons-vue'
import type { FilterSpeaker } from '@/model'
import { defaultFilterSpeaker } from '@/model'

const emit = defineEmits<{ 'update:visible': [value: boolean] }>()
const props = defineProps<{ visible: boolean }>()

const searchInputRef = ref<HTMLElement>()
const searchInput = ref('')
const boxRef = ref()
const handleRef = ref()
const filter = ref<FilterSpeaker>(defaultFilterSpeaker())

onMounted(() => {
  window.addEventListener('keydown', handleKeyDownEsc)
})

onUnmounted(() => {
  window.addEventListener('keydown', handleKeyDownEsc)
})

watch(
  () => props.visible,
  (newValue) => {
    newValue &&
      setTimeout(() => {
        searchInputFocus()
      }, 200)
  },
)

function handleKeyDownEsc(event: KeyboardEvent) {
  if (event.code === 'Escape') {
    props.visible && handleMinus()
  }
}

const { position } = useDraggable(handleRef, {
  initialValue: { x: 100, y: 100 },
})
const { style } = constrainDragBounds(boxRef, position)

function handleMinus() {
  emit('update:visible', false)
}

function searchInputFocus() {
  searchInputRef.value?.focus()
}

function handleSearchInputSubmit() {
  filter.value = { ...filter.value, word: searchInput.value }
}
</script>

<template>
  <div
    ref="boxRef"
    v-show="visible"
    :style="style"
    style="position: fixed"
    class="try-play user-select-none card z-3 shadow"
  >
    <div class="box ms-2">
      <div class="try-play-header text-center d-flex flex-row justify-content-between">
        <div ref="handleRef" class="col-11 try-play-move"></div>
        <div @click="handleMinus" class="col-1 try-play-menu-close">
          <ElIcon color="white"><Minus></Minus></ElIcon>
        </div>
      </div>
      <div class="try-play-body d-flex flex-row">
        <div class="try-play-left w-50 border-right border-secondary">
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
        <div
          class="try-play-right w-50 border-start rounded border-top border-secondary overflow-x-hidden overflow-y-auto scrollbar-none"
        >
          <SliderPanle></SliderPanle>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: 890px;
$height: 390px;

.try-play {
  width: $width;
  background-color: #2254a1;

  .try-play-header {
    .try-play-move {
      cursor: move;
    }

    .try-play-menu-close {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .try-play-body {
    height: $height;

    .try-play-left,
    .try-play-right {
      height: $height;
    }

    :deep(.el-input__wrapper) {
      background-color: transparent;
    }
  }
}
</style>
