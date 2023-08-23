import type { SSMLEditorConfig } from '@/config'
import { speaker, english, bgm, special } from './api'
import { ElMessage } from 'element-plus'

export default {
  handleError: (error) => ElMessage.warning({ message: error, grouping: true }),
  fetchSpeaker: speaker,
  fetchEnglish: english,
  fetchBgm: bgm,
  fetchSpecial: special
} as SSMLEditorConfig
