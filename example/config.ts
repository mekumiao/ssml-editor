import type { PartialSSMLEditorConfig } from '@/config'
import { english, bgm, special, scene, style, tag, speaker, star } from './api'
import { upload, transfer, conversionSpeaker, play } from './api'
import { fetchRecentUsage, deleteRecentUsage, recordRecentUsage } from './api'
import { ElMessage } from 'element-plus'

export default <PartialSSMLEditorConfig>{
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
  tryPlay: { featchTag: tag, fetchData: speaker, fetchStar: star, play: play },
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
