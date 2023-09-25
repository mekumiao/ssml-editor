import type { PartialSSMLEditorConfig } from '@/config'
import { english, bgm, special, scene, style, tag, speaker, star } from './api'
import { upload, transfer, conversionSpeaker, play } from './api'
import { fetchRecentUsage, deleteRecentUsage, recordRecentUsage } from './api'
import { ElMessage } from 'element-plus'
import type { Speaker } from '@/model'
import { sleep } from '@/utils'
import { emitter } from '@/event-bus'

emitter.on('tryplay-speaker-detail-show', (speaker) => {
  // 可打开自定义dialog
  ElMessage.success({ message: speaker.name, grouping: true })
})

/**
 * 覆盖试听面板的speaker选中方法
 * @param speaker 将选中的speaker
 * @param setter 设置选中的speaker
 */
async function selectSpeaker(speaker: Speaker, setter: (speaker: Speaker) => void) {
  if (!speaker.isFree) {
    ElMessage.warning({ message: '会员独享', grouping: true })
  } else {
    setter(speaker)
  }
}

async function saveHtml(getter: () => string) {
  await sleep(1000)
  window.localStorage.setItem('editor-html', getter())
  return Promise.resolve(true)
}

async function readHtml() {
  return window.localStorage.getItem('editor-html')
}

const config: PartialSSMLEditorConfig = {
  effects: { grayscale: false, zoom: true },
  editorConfig: { saveHtml: saveHtml, readHtml: readHtml },
  handleWarn: (message) => {
    ElMessage.warning({ message: message, grouping: true })
  },
  handleError: (error) => {
    if (typeof error === 'string') {
      ElMessage.error({ message: error, grouping: true })
    } else if (error instanceof Error) {
      ElMessage.error({ message: error.message, grouping: true })
    } else {
      console.error(error)
    }
  },
  english: { fetchData: english },
  bgm: { fetchData: bgm, fetchScene: scene, fetchStyle: style },
  special: { fetchData: special, fetchScene: scene, fetchStyle: style },
  tryPlay: {
    featchTag: tag,
    fetchData: speaker,
    fetchStar: star,
    play: play,
    selectSpeaker: selectSpeaker,
  },
  conversion: {
    timeoutMilliseconds: 20000,
    audioUpload: upload,
    transfer: transfer,
    fetchSpeaker: conversionSpeaker,
  },
  management: {
    fetchRecentUsage: fetchRecentUsage,
    deleteRecentUsage: deleteRecentUsage,
    recordRecentUsage: recordRecentUsage,
  },
}

export default config
