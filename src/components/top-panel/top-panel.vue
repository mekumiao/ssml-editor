<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElCard } from 'element-plus'
import { useParentElement, useElementBounding } from '@vueuse/core'

const visable = ref(false)
const parent = useParentElement()
const { top, left } = useElementBounding(parent)

const style = computed(() => `top:${top.value}px;left:${left.value}px`)

function show() {
  visable.value = true
}

function hide() {
  visable.value = false
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <div class="panel" v-show="visable" :style="style">
    <ElCard>
      <div class="content">
        <slot name="default"></slot>
      </div>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 9999;

  .content {
    height: 400px;
    width: 400px;
  }
}
</style>
