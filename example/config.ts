import type { SSMLEditorConfig } from '@/config'
import { pinyin, english, bgm, special, scene, style, tag, speaker, star } from './api'
import { upload, transfer, conversionSpeaker, play } from './api'
import { ElMessage } from 'element-plus'

export default <SSMLEditorConfig>{
  handleError: (error) => ElMessage.warning({ message: error, grouping: true }),
  pinyin: { fetchData: pinyin },
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
}
