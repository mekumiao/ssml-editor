<script setup lang="ts">
import { PROVIDER_KEY } from '@/constant'
import { type IDomEditor } from '@wangeditor/editor'
import { inject, type ShallowRef } from 'vue'

const emit = defineEmits<{ click: [editor: IDomEditor] }>()
const props = withDefaults(
  defineProps<{
    text: string
    icon: string
    disabled?: boolean
  }>(),
  { disabled: false }
)

const editorRef = inject<ShallowRef<IDomEditor>>(PROVIDER_KEY.EDITOR)

const handleClick = () => {
  if (!props.disabled && editorRef) {
    emit('click', editorRef?.value)
  }
}
</script>

<template>
  <div
    class="bar-button px-2 py-1"
    :class="{ disabled: disabled }"
    @click="handleClick"
    @mousedown.prevent
  >
    <div class="bar-button-icon">
      <span class="fs-3 iconfont-moyin" :class="[`moyin-icon_${icon}`]"></span>
    </div>
    <div class="fw-normal" style="font-size: 0.85rem">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.bar-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 4.5rem;

  border-radius: 0.5rem;

  &.disabled {
    color: #a7a5a5;
  }

  &:not(.disabled):hover {
    background-color: #e5e5e5;
  }

  .bar-button-icon {
    width: 30px;
    height: 30px;
  }
}
</style>
