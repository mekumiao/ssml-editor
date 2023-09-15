import type { PartialSSMLEditorConfig } from '@/config'
import { english, bgm, special, scene, style, tag, speaker, star } from './api'
import { upload, transfer, conversionSpeaker, play } from './api'
import { fetchRecentUsage, deleteRecentUsage, recordRecentUsage } from './api'
import { ElMessage } from 'element-plus'
import type { Speaker } from '@/model'

async function selectSpeaker(speaker: Speaker, speakerSetter: (speaker: Speaker) => void) {
  if (!speaker.isFree) {
    ElMessage.warning({ message: '会员独享', grouping: true })
  } else {
    speakerSetter(speaker)
  }
}

export default <PartialSSMLEditorConfig>{
  effects: { grayscale: false, zoom: true },
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
