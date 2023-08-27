<script setup lang="ts">
import type { LabelValue } from '@/model'
import { ref, toRaw } from 'vue'

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const props = defineProps<{ modelValue: string; dataList: LabelValue[] }>()

const listRef = ref<HTMLElement>()

function handleSelect(item: LabelValue) {
  emit('update:modelValue', item.value)
}

function scrollIntoViewTheItem() {
  if (!listRef.value) return
  for (let i = 0; i < props.dataList.length; i++) {
    if (props.dataList[i].value === props.modelValue) {
      listRef.value.children[i]?.scrollIntoView({ behavior: 'smooth' })
      return
    }
  }
}

defineExpose({
  scrollIntoViewTheItem,
})
</script>

<template>
  <div class="select-list" style="width: 120px">
    <div class="text-center d-flex flex-column justify-content-center fs-6" style="height: 60px">
      <slot></slot>
    </div>
    <ul
      ref="listRef"
      class="text-center w-100 border-start border-top border-bottom border-secondary-subtle overflow-y-auto overflow-x-hidden scrollbar-none"
      style="height: 180px"
    >
      <li
        class="clickable select-item py-1"
        v-for="(item, index) in dataList"
        :class="{ activate: item.value === modelValue }"
        :key="index"
        @click="handleSelect(toRaw(item))"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.select-list {
  .activate {
    color: #3583fb;
  }

  .select-item {
    font-size: 0.5rem;
  }
}
</style>
