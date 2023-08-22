import type { SSMLEditorConfig } from '@/config'
import { speaker, english } from './api'
import { ElMessage } from 'element-plus'

export default {
  handleError: (error) => ElMessage.warning({ message: error, grouping: true }),
  fetchSpeaker: speaker,
  fetchEnglish: english
} as SSMLEditorConfig
