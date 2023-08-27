import type { SSMLEditorConfig } from '@/config'
import { pinyin, english, bgm, special } from './api'
import { ElMessage } from 'element-plus'

export default {
  handleError: (error) => ElMessage.warning({ message: error, grouping: true }),
  fetchPinyin: pinyin,
  fetchEnglish: english,
  fetchBgm: bgm,
  fetchSpecial: special,
} as SSMLEditorConfig
