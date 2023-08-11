<script setup lang="ts">
import ArticleTitleContent from './ArticleTitleContent.vue'
import ArticleWord from './ArticleWord.vue'
import ToolBarWrapper from './ToolBarWrapper.vue'
</script>

<template>
  <div class="article-view">
    <ArticleTitleContent></ArticleTitleContent>
    <div class="article-box">
      <ToolBarWrapper></ToolBarWrapper>
      <div class="h h-1"></div>
      <ArticleWord></ArticleWord>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
