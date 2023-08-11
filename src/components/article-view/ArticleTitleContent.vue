<script setup lang="ts">
import { ElButton } from 'element-plus'
import { Share } from '@element-plus/icons-vue'
</script>

<template>
  <div class="article-title-content">
    <div class="title-wrapper">
      <div class="title-author">测试配音</div>
      <div class="h h-1"></div>
      <div class="author">
        <div>已保存</div>
        <div>|</div>
        <div>400/5000字</div>
      </div>
    </div>
    <div class="operation-wrapper">
      <ElButton type="primary" :icon="Share">分享</ElButton>
      <div class="menu-divider"></div>
      <ElButton type="primary">配音</ElButton>
      <ElButton>下载音频</ElButton>
      <ElButton>下载视频</ElButton>
      <ElButton>下载字幕</ElButton>
      <ElButton>声音转换</ElButton>
      <div class="menu-divider"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-title-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  padding: 10px 10px;

  .author {
    display: flex;
    flex-direction: row;
    font-size: 12px;
    color: #999999;
  }
}

.operation-wrapper {
  display: flex;
  flex-direction: row;

  .menu-divider {
    height: 30px;
    width: 1px;
    margin: 0 14px;
    background: #e1e1e1;
  }
}
</style>
