<script setup lang="ts">
defineProps<{ text: string; icon: string }>()
</script>

<template>
  <div class="tools-button">
    <button class="button">
      <span :class="'size font-size-3 iconfont ' + icon"></span>
    </button>
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
