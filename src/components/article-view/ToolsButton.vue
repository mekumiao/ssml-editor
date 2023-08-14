<script setup lang="ts">
defineProps<{ text: string; icon: string }>()
const emit = defineEmits<{ click: [evt: MouseEvent] }>()
const onClick = (evt: MouseEvent) => emit('click', evt)
</script>

<template>
  <div class="btn tools-button" @click="onClick" @mousedown.prevent>
    <div class="button">
      <span :class="'size font-size-3 iconfont ' + icon"></span>
    </div>
    <div class="content">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.tools-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  padding: 5px 8px;

  &:hover {
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
