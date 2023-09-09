<script setup lang="ts">
import { useEditorStore } from '@/stores'
import { type IDomEditor } from '@wangeditor/editor'
import throttle from 'lodash.throttle'

const emit = defineEmits<{ click: [editor: IDomEditor] }>()
withDefaults(
  defineProps<{
    icon?: string
    disabled?: boolean
  }>(),
  { icon: 'play', disabled: false },
)

const handleClick = throttle(() => {
  const { editor } = useEditorStore()
  if (editor) emit('click', editor)
})
</script>

<template>
  <button
    :disabled="disabled"
    class="play-menu d-flex flex-column justify-content-center align-items-center btn border-0 px-2 py-1 clickable"
    @click="handleClick"
    @mousedown.prevent
    style="height: 4.5rem"
  >
    <div
      class="play-menu-icon d-flex justify-content-center align-items-center"
      style="height: 30px; width: 30px"
    >
      <slot name="icon">
        <span class="fs-3 iconfont-moyin" :class="[`moyin-icon_${icon}`]"></span>
      </slot>
    </div>
    <div class="fw-normal" style="font-size: 0.85rem">
      <slot></slot>
    </div>
  </button>
</template>

<style lang="scss" scoped></style>
