<script setup lang="ts">
import { EditorView } from '@/view'
import type { IDomEditor } from '@wangeditor/editor'

const html = `<p> <span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="晓萱|年轻成年女性|快乐|1.0x"\n          data-ow-style="cheerful"\n          data-ow-name="zh-CN-XiaoxuanNeural"\n          data-ow-role="YoungAdultFemale"\n          data-ow-pitch="0%"\n          data-ow-rate="0%"\n        >在小镇的角落，有座废弃的图书馆。</span> &nbsp;<span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="晓涵|年长成年女性|温柔|1.0x"\n          data-ow-style="gentle"\n          data-ow-name="zh-CN-XiaohanNeural"\n          data-ow-role="OlderAdultFemale"\n          data-ow-pitch="5%"\n          data-ow-rate="0%"\n        >一个孤独的少年偶然发现，这里是通往未知世界的门户。</span> &nbsp;<span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="云皓|年长成年男性|冷静|1.0x"\n          data-ow-style="calm"\n          data-ow-name="zh-CN-YunhaoNeural"\n          data-ow-role="OlderAdultMale"\n          data-ow-pitch="5%"\n          data-ow-rate="0%"\n        >他探索着书架间的奇幻迷宫， <span\n          data-w-e-type="ssml-prosody"\n          data-w-e-is-inline\n          data-ow-remark="0.75x"\n          data-ow-contour=""\n          data-ow-pitch=""\n          data-ow-range=""\n          data-ow-rate="-25%"\n          data-ow-volume=""\n        >结识了狐妖、机器人和魔法师。</span> </span> &nbsp;<span\n          data-w-e-type="ssml-sub"\n          data-w-e-is-inline\n          data-ow-remark="慢慢的"\n          data-ow-alias="慢慢的"\n        >逐渐</span> ， <span\n          data-w-e-type="ssml-prosody"\n          data-w-e-is-inline\n          data-ow-remark="连读"\n          data-ow-contour=""\n          data-ow-pitch=""\n          data-ow-range=""\n          data-ow-rate="medium"\n          data-ow-volume=""\n        >少年的日常与奇幻交织</span> ， <span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="云枫|男孩|生气|1.0x"\n          data-ow-style="angry"\n          data-ow-name="zh-CN-YunfengNeural"\n          data-ow-role="Boy"\n          data-ow-pitch="5%"\n          data-ow-rate="0%"\n        >他勇敢面对困难，书中的世界也倾听着他的故事。</span> 他用勇气和 <span\n          data-w-e-type="ssml-sub"\n          data-w-e-is-inline\n          data-ow-remark="击毙你"\n          data-ow-alias="击毙你"\n        >智慧</span> 拯救了一个王国，也找到了珍贵的友情。 <span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="云希|默认|默认|1.0x"\n          data-ow-style="Default"\n          data-ow-name="zh-CN-YunxiNeural"\n          data-ow-role="Default"\n          data-ow-pitch="5%"\n          data-ow-rate="0%"\n        >最终，当他决定返回现实，他才意识到，这些奇幻经历已经让他变得坚强，而图书馆也因他重新恢复了光彩，成为小镇的宝藏。</span> </p>`

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
