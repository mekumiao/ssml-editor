<script setup lang="ts">
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import { computed, inject, ref, useSlots } from 'vue'
import xmlFormat from 'xml-formatter'
import { serializeToSSML } from '@/serialize'
import { useEditorStore, useSSMLStore } from '@/stores'
import { PlayTag } from '@/components'
import { exportRaw } from '@/utils'
import dayjs from 'dayjs'

withDefaults(defineProps<{ showSsmlButton?: boolean }>(), { showSsmlButton: true })

const slots = useSlots()

const dialogVisible = ref(false)
const ssml = ref('')
const { rootBackgroundaudio } = useSSMLStore()
const editorStore = useEditorStore()
const editorKey = inject<symbol>('editorKey')!

const ssmlFormat = computed(() => {
  return xmlFormat(ssml.value, {
    indentation: '    ',
    filter: (node) => node.type !== 'Comment',
    collapseContent: true,
    lineSeparator: '\n',
  })
})

const saveStateFormat = computed(() => {
  const map: Record<typeof editorStore.saveState, string> = {
    unsave: '未保存',
    saving: '保存中...',
    saved: '已保存',
  }
  return map[editorStore.saveState]
})

function handleShowSSML() {
  ssml.value = serializeToSSML()
  dialogVisible.value = true
}

function handleCopySSML() {
  ssml.value = serializeToSSML()
  handleCopy(false)
}

function handleCloseBgm() {
  rootBackgroundaudio.src = ''
  rootBackgroundaudio.remark = ''
}

async function handleSave() {
  const editor = editorStore.editor
  if (editor) {
    try {
      await editorStore.saveEditorHtml(editorKey, editor.getHtml, false)
      ElMessage.success({ message: '保存成功!', grouping: true })
    } catch (error) {
      ElMessage.error({ message: '保存失败!', grouping: true })
    }
  }
}

function handleExport() {
  const editor = editorStore.editor
  if (editor) {
    ssml.value = serializeToSSML()
    const fileName = `ssml-raw-${dayjs().format('YYYY-MM-DDTHH:mm:ss')}`
    exportRaw(fileName, ssml.value)
  }
}

/**
 * 复制ssml到剪贴板
 * @param isFormat 是否格式化ssml(多余的空格和换行可能会导致意外的停顿)
 */
async function handleCopy(isFormat: boolean) {
  await navigator.clipboard.writeText(isFormat ? ssmlFormat.value : ssml.value)
  dialogVisible.value = false
  ElMessage.success({ message: '复制成功!', grouping: true })
}
</script>

<template>
  <div class="editor-header d-flex flex-row align-item-center justify-content-between">
    <div class="title-wrapper d-flex flex-column justify-content-center ps-3">
      <div class="pb-1"><slot name="title">SSML编辑器</slot></div>
      <div class="author d-flex flex-row align-items-center justify-content-start">
        <div>{{ saveStateFormat }}</div>
        <PlayTag
          v-if="rootBackgroundaudio.src"
          :src="rootBackgroundaudio.src"
          @close="handleCloseBgm"
        >
          {{ rootBackgroundaudio.remark }}
        </PlayTag>
      </div>
    </div>
    <div class="operation-wrapper d-flex flex-row justify-content-center align-items-center">
      <template v-if="showSsmlButton">
        <ElButton type="primary" @click="handleSave">保存到浏览器</ElButton>
        <ElButton type="primary" @click="handleExport">导出文件(.txt)</ElButton>
        <div class="menu-divider"></div>
        <ElButton type="warning" @click="handleCopySSML">复制 SSML</ElButton>
        <ElButton type="warning" @click="handleShowSSML">显示 SSML</ElButton>
        <div v-if="slots.menus" class="menu-divider"></div>
      </template>
      <slot name="menus"></slot>
      <div class="px-1"></div>
    </div>
  </div>

  <ElDialog v-model="dialogVisible" title="查看SSML" width="80%">
    <div
      class="border border-secondary-subtle rounded-2 scrollbar overflow-y-auto"
      style="white-space: pre-wrap; max-height: 50vh"
    >
      <highlightjs language="xml" :code="ssmlFormat" />
    </div>
    <template #header>
      <ElButton type="info" @click="handleCopy(true)">复制+关闭</ElButton>
      <ElButton type="primary" @click="handleCopy(false)">压缩+复制+关闭(推荐)</ElButton>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <ElButton type="info" @click="handleCopy(true)">复制+关闭</ElButton>
        <ElButton type="primary" @click="handleCopy(false)">压缩+复制+关闭(推荐)</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.editor-header {
  height: 80px;

  .title-wrapper {
    .author {
      height: 20px;
      font-size: 12px;
      color: #999999;
    }
  }

  .operation-wrapper {
    .menu-divider {
      height: 30px;
      width: 1px;
      margin: 0 14px;
      background: #e1e1e1;
    }
  }
}
</style>
