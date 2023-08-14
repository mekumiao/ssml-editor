<script setup lang="ts">
import EditBarButton from './EditBarButton.vue'
import { handleContinuous, handlePolyphone, handleSayAs } from '@/module/ssml'
</script>

<template>
  <div class="edit-bar-wrapper">
    <div class="tool-list">
      <EditBarButton text="24K高清音质" icon="icon-play" disabled></EditBarButton>
    </div>
    <div class="divider divider-green"></div>
    <div class="tool-list">
      <EditBarButton text="多音字" icon="icon-play" @click="handlePolyphone"></EditBarButton>
      <EditBarButton text="重音" icon="icon-play" disabled></EditBarButton>
      <EditBarButton
        text="数字符号"
        icon="icon-play"
        @click="handleSayAs('digits')"
      ></EditBarButton>
      <EditBarButton text="连读" icon="icon-play" @click="handleContinuous"></EditBarButton>
      <EditBarButton
        text="别名"
        icon="icon-play"
        @click="handleSayAs('characters')"
      ></EditBarButton>
      <EditBarButton text="音标" icon="icon-play" @click="handlePolyphone"></EditBarButton>
    </div>
    <div class="divider divider-cyan"></div>
    <div class="tool-list">
      <EditBarButton text="局部变速" icon="icon-play" disabled></EditBarButton>
      <EditBarButton text="多人配音" icon="icon-play" disabled></EditBarButton>
      <EditBarButton text="局部变音" icon="icon-play" disabled></EditBarButton>
    </div>
    <div class="divider divider-orange"></div>
    <div class="tool-list">
      <EditBarButton text="停顿调节" icon="icon-play" disabled></EditBarButton>
      <EditBarButton text="插入静音" icon="icon-play" disabled></EditBarButton>
      <!-- <EditBarButton text="符号静音" icon="icon-play"></EditBarButton>
      <EditBarButton text="段落静音" icon="icon-play"></EditBarButton>
      <EditBarButton text="解说模式" icon="icon-play"></EditBarButton> -->
    </div>
    <div class="divider divider-purple"></div>
    <div class="tool-list">
      <EditBarButton text="音效" icon="icon-play" disabled></EditBarButton>
      <EditBarButton text="配乐" icon="icon-play" disabled></EditBarButton>
    </div>
    <!-- <div class="divider divider-yellow"></div>
    <div class="tool-list">
      <EditBarButton text="批量替换" icon="icon-play"></EditBarButton>
      <EditBarButton text="查看拼音" icon="icon-play"></EditBarButton>
      <EditBarButton text="敏感词" icon="icon-play"></EditBarButton>
      <EditBarButton text="评论" icon="icon-play"></EditBarButton>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.edit-bar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .tool-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .divider {
    height: 50px;
    width: 3px;
    margin: 1px 14px;

    &.divider-green {
      background: var(--tool-green-border-color);
    }

    &.divider-cyan {
      background: var(--tool-cyan-color);
    }

    &.divider-orange {
      background: var(--tool-orange-color);
    }
    &.divider-purple {
      background: var(--tool-purple-color);
    }
    &.divider-yellow {
      background: var(--tool-yellow-color);
    }
  }
}
</style>
@/module/ssml/menu/continuous-menu@/module/ssml/menu/polyphone-menu
