import type { PartialSSMLEditorConfig } from '@/config'
import { english, bgm, special, scene, style, tag, speaker, star } from './api'
import { upload, transfer, conversionSpeaker, play } from './api'
import { fetchRecentUsage, deleteRecentUsage, recordRecentUsage } from './api'
import { ElMessage, ElNotification } from 'element-plus'
import type { Speaker } from '@/model'
import { sleep } from '@/utils'
import { emitter } from '@/event-bus'

emitter.on('tryplay-speaker-detail-show', (speaker) => {
  ElNotification.info(speaker.name)
})

async function selectSpeaker(speaker: Speaker, setter: (speaker: Speaker) => void) {
  if (!speaker.isFree) {
    ElMessage.warning({ message: '会员独享', grouping: true })
  } else {
    setter(speaker)
  }
}

async function saveHtml(getter: () => string) {
  await sleep(200)
  window.localStorage.setItem('editor-html', getter())
  return Promise.resolve(true)
}

async function readHtml() {
  return window.localStorage.getItem('editor-html')
}

const config: PartialSSMLEditorConfig = {
  animation: { grayscale: false, zoom: true },
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
