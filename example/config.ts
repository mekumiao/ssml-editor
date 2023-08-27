import type { SSMLEditorConfig } from '@/config'
import { pinyin, english, bgm, special, scene, style } from './api'
import { ElMessage } from 'element-plus'

export default <SSMLEditorConfig>{
  handleError: (error) => ElMessage.warning({ message: error, grouping: true }),
  pinyin: { fetchData: pinyin },
  english: { fetchData: english },
  bgm: { fetchData: bgm, fetchScene: scene, fetchStyle: style },
  special: { fetchData: special, fetchScene: scene, fetchStyle: style },
}
