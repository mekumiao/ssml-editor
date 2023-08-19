<script setup lang="ts">
import { ElButton, ElDialog, ElTag } from 'element-plus'
import { Share } from '@element-plus/icons-vue'
import { computed, inject, ref, type ShallowRef } from 'vue'
import type { IDomEditor } from '@wangeditor/editor'
import xmlFormat from 'xml-formatter'
import { playSound } from '@/utils'

defineProps<{
  characterTotal: number
  characterMax: number
  bgm?: { value: string; label: string } | null
}>()

const editorRef = inject<ShallowRef<IDomEditor>>('editor')
const dialogVisible = ref(false)
const ssmlValue = ref('')

const ssml = computed(() => {
  return xmlFormat(ssmlValue.value, {
    indentation: '    ',
    filter: (node) => node.type !== 'Comment',
    collapseContent: false,
    lineSeparator: '\n'
  })
})

const handleGenSSML = () => {
  if (editorRef) {
    ssmlValue.value = editorRef.value.getHtml()
    dialogVisible.value = true
  }
}

const handleRemoveBgm = () => {
  editorRef?.value?.emit('removeBgm')
}
</script>

<template>
  <div class="edit-title">
    <div class="title-wrapper">
      <div class="title-author">SSML编辑器</div>
      <div class="h h-1"></div>
      <div class="author">
        <div>已保存</div>
        <div>|</div>
        <div>{{ characterTotal }}/{{ characterMax }}字</div>
        <div class="w-2"></div>
        <ElTag
          class="bgm-txt p-2"
          closable
          size="small"
          @click="() => bgm && bgm.value && playSound(bgm.value)"
          @close="handleRemoveBgm"
          v-if="bgm"
        >
          <span class="iconfont icon-play font-size-12 p1"></span>
          <div class="inline-block w-1 p-1"></div>
          <span>{{ bgm.label }}</span>
        </ElTag>
      </div>
    </div>
    <div class="operation-wrapper">
      <ElButton type="primary" :icon="Share" disabled>分享</ElButton>
      <div class="menu-divider"></div>
      <ElButton type="primary" @click="handleGenSSML">查看SSML</ElButton>
      <ElButton disabled>下载音频</ElButton>
      <ElButton disabled>下载视频</ElButton>
      <ElButton disabled>下载字幕</ElButton>
      <ElButton disabled>声音转换</ElButton>
      <div class="w w-2"></div>
    </div>
  </div>

  <ElDialog v-model="dialogVisible" title="查看SSML" width="50%">
    <pre class="ssml-code">{{ ssml }}</pre>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.edit-title {
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
    height: 10px;
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

.ssml-code {
  height: 400px;
  overflow-y: auto;
}

.inline-block {
  display: inline-block;
}

.iconfont.icon-play {
  cursor: pointer;
}

.bgm-txt {
  cursor: pointer;
}
</style>
