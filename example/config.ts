import type { PartialSSMLEditorConfig } from '@/config'
import { english, bgm, special, scene, style, tag, speaker, star } from './api'
import { upload, transfer, conversionSpeaker, play } from './api'
import { fetchRecentUsage, deleteRecentUsage, recordRecentUsage } from './api'
import { ElMessage } from 'element-plus'
import type { Speaker } from '@/model'
import { sleep } from '@/utils'

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
  handleError: (error, detail) => {
    if (!detail) {
      ElMessage.warning({ message: error, grouping: true })
    } else {
      console.error(error, detail)
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
