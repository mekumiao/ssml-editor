<script setup lang="ts">
import { EditorView } from '@/view'
import type { IDomEditor } from '@wangeditor/editor'

const html = `<p>在小镇的角落，有座废弃的图书馆。一个孤独的少年偶然发现，这里是通往未知世界的门户。他探索着书架间的奇幻迷宫，结识了狐妖、机器人和魔法师。逐渐，少年的日常与奇幻交织，他勇敢面对困难，书中的世界也倾听着他的故事。他用勇气和智慧拯救了一个王国，也找到了珍贵的友情。最终，当他决定返回现实，他才意识到，这些奇幻经历已经让他变得坚强，而图书馆也因他重新恢复了光彩，成为小镇的宝藏。</p>`

function handleCreate(editor: IDomEditor) {
  // 这里公开editor是为了方便测试
  window.editor = editor
  editor.setHtml(html)
  // 异步设置焦点(editor渲染需要时间)
  setTimeout(() => {
    editor.focus(true)
  }, 500)
}
</script>

<template>
  <EditorView @created="handleCreate"></EditorView>
</template>

<style scoped></style>
