<script setup lang="ts">
import { EditorView } from '@/view'
import type { IDomEditor } from '@wangeditor/editor'

const html = `<p> <span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="晓萱|年长成年女性|快乐|1.0x"\n          data-ow-style="cheerful"\n          data-ow-name="zh-CN-XiaoxuanNeural"\n          data-ow-role="OlderAdultFemale"\n          data-ow-role="5%"\n          data-ow-role="0%"\n        >在小镇的角落，有座废弃的图书馆。</span> &nbsp;<span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="云健|年轻成年男性|冷静|1.0x"\n          data-ow-style="calm"\n          data-ow-name="zh-CN-YunjianNeural"\n          data-ow-role="YoungAdultMale"\n          data-ow-role="5%"\n          data-ow-role="0%"\n        >一个孤独的少年偶然发现，这里是通往未知世界的门户。</span> 他 <span\n          data-w-e-type="ssml-prosody"\n          data-w-e-is-inline\n          data-ow-remark="0.9x"\n          data-ow-contour=""\n          data-ow-pitch=""\n          data-ow-range=""\n          data-ow-rate="-10%"\n          data-ow-volume=""\n        >探索着书架间的奇幻迷宫，结识了狐妖、机器人和魔法师。</span> &nbsp;<span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="晓晓|年长成年女性|抑郁|1.0x"\n          data-ow-style="depressed"\n          data-ow-name="zh-CN-XiaoxiaoNeural"\n          data-ow-role="OlderAdultFemale"\n          data-ow-role="5%"\n          data-ow-role="0%"\n        >逐渐，少年的日常与奇幻交织，他勇敢面对困难，书中的世界也倾听着他的故事。</span> &nbsp;<span\n          data-w-e-type="custom-management"\n          data-w-e-is-inline\n          data-ow-remark="晓悠|女孩|生气|1.2x"\n          data-ow-style="angry"\n          data-ow-name="zh-CN-XiaoyouNeural"\n          data-ow-role="Girl"\n          data-ow-role="5%"\n          data-ow-role="20%"\n        >他用勇气和智慧拯救了一个王国，也找到了珍贵的友情。</span> 最终，当他决定返回现实，他才意识到，这些 <span\n          data-w-e-type="ssml-phoneme"\n          data-w-e-is-inline\n          data-ow-remark="ji 4"\n          data-ow-alphabet="sapi"\n          data-ow-ph="ji 4"\n        >奇</span> 幻经历已经让他变得坚强，而 <span\n          data-w-e-type="ssml-sub"\n          data-w-e-is-inline\n          data-ow-remark="击毙你"\n          data-ow-alias="击毙你"\n        >图书馆</span> 也因他重新恢复了光彩，成为小镇的宝 <span\n          data-w-e-type="ssml-phoneme"\n          data-w-e-is-inline\n          data-ow-remark="cang 4"\n          data-ow-alphabet="sapi"\n          data-ow-ph="cang 4"\n        >藏</span> 。</p>`

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
