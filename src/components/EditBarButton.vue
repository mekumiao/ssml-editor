<script setup lang="ts">
import type { IDomEditor } from '@wangeditor/editor'
import { inject, type ShallowRef } from 'vue'

const emit = defineEmits<{
  click: [editor: IDomEditor]
  'update:visiblePopover': [value: boolean]
}>()
const props = withDefaults(
  defineProps<{
    text: string
    icon: string
    disabled?: boolean
  }>(),
  { disabled: false }
)

const editorRef = inject<ShallowRef<IDomEditor>>('editor')

const handleClick = () => {
  if (!props.disabled && editorRef) {
    emit('click', editorRef?.value)
  }
}
</script>

<template>
  <div
    class="btn edit-bar-button"
    :class="{ disabled: disabled }"
    @click="handleClick"
    @mousedown.prevent
  >
    <div class="button">
      <span class="size font-size-3 iconfont-moyin" :class="[`moyin-icon_${icon}`]"></span>
    </div>
    <div class="content">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.edit-bar-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  padding: 5px 8px;

  &.disabled {
    color: #a7a5a5;
  }

  &:not(.disabled):hover {
    background-color: #e5e5e5;
  }

  .button {
    width: 30px;
    height: 30px;
  }

  .content {
    font-size: 12px;
  }
}
</style>
