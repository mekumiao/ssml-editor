<script setup lang="ts">
import { ElButton, ElDialog, ElTag } from 'element-plus'
import { Share } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import xmlFormat from 'xml-formatter'
import { audioPlayer } from '@/utils'
import { serializeToSSML } from '@/serialize'
import { useSSMLStore } from '@/stores'

const dialogVisible = ref(false)
const ssmlValue = ref('')
const { rootBackgroundaudio } = useSSMLStore()

const ssml = computed(() => {
  return xmlFormat(ssmlValue.value, {
    indentation: '    ',
    filter: (node) => node.type !== 'Comment',
    collapseContent: true,
    lineSeparator: '\n',
  })
})

const handleGenSSML = () => {
  ssmlValue.value = serializeToSSML()
  dialogVisible.value = true
}

const handlePlayBgm = () => {
  rootBackgroundaudio.src && audioPlayer.play(rootBackgroundaudio.src)
}

const handleCloseBgm = () => {
  audioPlayer.stop(rootBackgroundaudio.src)
  rootBackgroundaudio.src = ''
  rootBackgroundaudio.remark = ''
}

/**
 * 复制ssml到剪贴板
 * @param isFormat 是否输出copy格式化的文本到剪贴板. 多余的空格和换行可能会导致意外的停顿
 */
async function handleCopy(isFormat: boolean) {
  await navigator.clipboard.writeText(isFormat ? ssml.value : ssmlValue.value)
  dialogVisible.value = false
}
</script>

<template>
  <div class="editor-title d-flex flex-row align-item-center justify-content-between">
    <div class="title-wrapper d-flex flex-column justify-content-center ps-3">
      <div class="title-author pb-1">SSML编辑器</div>
      <div class="author d-flex flex-row align-items-center justify-content-start">
        <div>未保存</div>
        <ElTag
          class="bgm-txt ms-2"
          closable
          size="small"
          @click="handlePlayBgm"
          @close="handleCloseBgm"
          v-if="rootBackgroundaudio.src"
        >
          <span class="iconfont icon-play font-size-12 p-1"></span>
          <div class="d-inline-block"></div>
          <span>{{ rootBackgroundaudio.remark }}</span>
        </ElTag>
      </div>
    </div>
    <div class="operation-wrapper d-flex flex-row justify-content-center align-items-center">
      <ElButton type="primary" :icon="Share" disabled>分享</ElButton>
      <div class="menu-divider"></div>
      <ElButton type="primary" @click="handleGenSSML">查看SSML</ElButton>
      <ElButton disabled>下载音频</ElButton>
      <ElButton disabled>下载视频</ElButton>
      <ElButton disabled>下载字幕</ElButton>
      <ElButton disabled>声音转换</ElButton>
      <div class="px-1"></div>
    </div>
  </div>

  <ElDialog v-model="dialogVisible" title="查看SSML" width="80%">
    <pre
      class="ssml-code border border-secondary-subtle rounded-2 px-2"
      style="white-space: pre-wrap; max-height: 50vh"
      >{{ ssml }}</pre
    >
    <template #header>
      <ElButton type="primary" @click="handleCopy(false)">压缩+复制+关闭</ElButton>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <ElButton type="primary" @click="handleCopy(true)">复制+关闭</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.editor-title {
  height: 80px;
  background-color: white;

  .title-wrapper {
    .author {
      height: 20px;
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

  .ssml-code {
    height: 400px;
    overflow-y: auto;
  }

  .iconfont.icon-play {
    cursor: pointer;
  }

  .bgm-txt {
    cursor: pointer;
  }
}
</style>
